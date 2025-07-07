#!/bin/bash

# React Native Enterprise Release Build Script
# Version: 2.0.0
# Description: React Native build automation script
# Author: DevOps Team
# Last Modified: $(date +%Y-%m-%d)

set -euo pipefail  # Strict error handling
IFS=$'\n\t'       # Secure Internal Field Separator

# Script configuration
readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly PROJECT_ROOT="$SCRIPT_DIR"
readonly LOG_DIR="$PROJECT_ROOT/build-logs"
readonly CONFIG_FILE="$PROJECT_ROOT/build.config"
readonly TIMESTAMP=$(date +%Y%m%d_%H%M%S)
readonly LOG_FILE="$LOG_DIR/build_${TIMESTAMP}.log"

# Colors for output
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly BLUE='\033[0;34m'
readonly PURPLE='\033[0;35m'
readonly CYAN='\033[0;36m'
readonly NC='\033[0m' # No Color

# Build configuration defaults
DEFAULT_ANDROID_BUILD_TYPE="release"
DEFAULT_IOS_BUILD_TYPE="Release"
DEFAULT_ENABLE_PROGUARD="true"
DEFAULT_ENABLE_HERMES="true"
DEFAULT_SPLIT_APKS="true"
DEFAULT_KEYSTORE_PATH="android/app/release-key.keystore"

# Initialize logging
init_logging() {
    mkdir -p "$LOG_DIR"
    exec 1> >(tee -a "$LOG_FILE")
    exec 2> >(tee -a "$LOG_FILE" >&2)
    
    log_info "=== Build Session Started: $(date) ==="
    log_info "Script: $0"
    log_info "Arguments: $*"
    log_info "User: $(whoami)"
    log_info "Working Directory: $(pwd)"
    log_info "Log File: $LOG_FILE"
}

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1"
}

log_debug() {
    if [[ "${DEBUG:-false}" == "true" ]]; then
        echo -e "${PURPLE}[DEBUG]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1"
    fi
}

# Error handling
error_handler() {
    local line_number=$1
    local error_code=$2
    log_error "Build failed at line $line_number with exit code $error_code"
    log_error "Check the log file: $LOG_FILE"
    
    # Send notification if configured
    send_notification "Build Failed" "Build failed at line $line_number. Check logs for details."
    
    cleanup_on_error
    exit $error_code
}

trap 'error_handler ${LINENO} $?' ERR

# Cleanup function
cleanup_on_error() {
    log_info "Performing cleanup after error..."
    # Kill any background processes
    jobs -p | xargs -r kill 2>/dev/null || true
}

# Load configuration
load_config() {
    if [[ -f "$CONFIG_FILE" ]]; then
        log_info "Loading configuration from $CONFIG_FILE"
        # shellcheck source=/dev/null
        source "$CONFIG_FILE"
    else
        log_warning "Configuration file not found. Using defaults."
        create_default_config
    fi
}

# Create default configuration file
create_default_config() {
    log_info "Creating default configuration file"
    cat > "$CONFIG_FILE" << EOF
# React Native Build Configuration
# This file contains build settings and can be customized per environment

# Android Configuration
ANDROID_BUILD_TYPE="$DEFAULT_ANDROID_BUILD_TYPE"
KEYSTORE_PATH="$DEFAULT_KEYSTORE_PATH"
ENABLE_PROGUARD="$DEFAULT_ENABLE_PROGUARD"
ENABLE_HERMES="$DEFAULT_ENABLE_HERMES"
SPLIT_APKS="$DEFAULT_SPLIT_APKS"

# iOS Configuration
IOS_BUILD_TYPE="$DEFAULT_IOS_BUILD_TYPE"
IOS_SCHEME="App"
IOS_WORKSPACE="ios/App.xcworkspace"

# Notification Configuration (optional)
SLACK_WEBHOOK_URL=""
TEAMS_WEBHOOK_URL=""
EMAIL_RECIPIENTS=""

# CI/CD Configuration
CI_MODE="false"
UPLOAD_TO_STORE="false"
STORE_CREDENTIALS_PATH=""

# Security Configuration
ENABLE_CODE_SIGNING_VERIFICATION="true"
ENABLE_SECURITY_SCAN="false"
SONARQUBE_URL=""
SONARQUBE_TOKEN=""
EOF
    log_success "Default configuration created at $CONFIG_FILE"
}

# Send notifications
send_notification() {
    local title="$1"
    local message="$2"
    
    # Slack notification
    if [[ -n "${SLACK_WEBHOOK_URL:-}" ]]; then
        curl -X POST -H 'Content-type: application/json' \
            --data "{\"text\":\"$title: $message\"}" \
            "$SLACK_WEBHOOK_URL" 2>/dev/null || log_warning "Failed to send Slack notification"
    fi
    
    # Teams notification
    if [[ -n "${TEAMS_WEBHOOK_URL:-}" ]]; then
        curl -X POST -H 'Content-type: application/json' \
            --data "{\"title\":\"$title\",\"text\":\"$message\"}" \
            "$TEAMS_WEBHOOK_URL" 2>/dev/null || log_warning "Failed to send Teams notification"
    fi
    
    # Email notification (requires mailx or similar)
    if [[ -n "${EMAIL_RECIPIENTS:-}" ]] && command -v mail >/dev/null 2>&1; then
        echo "$message" | mail -s "$title" "$EMAIL_RECIPIENTS" || log_warning "Failed to send email notification"
    fi
}

# Environment validation
validate_environment() {
    log_info "🔍 Validating build environment..."
    
    # Check if we're in a React Native project
    if [[ ! -f "package.json" ]]; then
        log_error "package.json not found. Are you in the React Native project root?"
        exit 1
    fi
    
    # Validate package.json structure
    if ! command -v jq >/dev/null 2>&1; then
        log_warning "jq not installed. Skipping JSON validation."
    else
        if ! jq -e '.dependencies."react-native"' package.json >/dev/null 2>&1; then
            log_error "This doesn't appear to be a React Native project"
            exit 1
        fi
    fi
    
    # Check Node.js version
    if ! command -v node >/dev/null 2>&1; then
        log_error "Node.js is not installed"
        exit 1
    fi
    
    local node_version
    node_version=$(node --version)
    log_info "Node.js version: $node_version"
    
    # Check Yarn
    if ! command -v yarn >/dev/null 2>&1; then
        log_error "Yarn is not installed"
        exit 1
    fi
    
    log_info "Yarn version: $(yarn --version)"
    
    # Check dependencies
    if [[ ! -d "node_modules" ]]; then
        log_warning "node_modules not found. Installing dependencies..."
        yarn install --frozen-lockfile
    fi
    
    # Validate lockfile
    if [[ -f "yarn.lock" ]]; then
        yarn check --integrity || {
            log_warning "Lockfile integrity check failed. Reinstalling dependencies..."
            rm -rf node_modules
            yarn install --frozen-lockfile
        }
    fi
    
    log_success "Environment validation completed"
}

# Security checks
security_checks() {
    log_info "🔒 Performing security checks..."
    
    # Check for sensitive files
    local sensitive_files=(".env" "android/app/my-upload-key.keystore" "ios/App/GoogleService-Info.plist")
    for file in "${sensitive_files[@]}"; do
        if [[ -f "$file" ]]; then
            log_warning "Sensitive file detected: $file"
            # Ensure proper permissions
            chmod 600 "$file" 2>/dev/null || true
        fi
    done
    
    # Check for hardcoded secrets (basic check)
    if grep -r -i "password\|secret\|key\|token" --include="*.js" --include="*.ts" --include="*.tsx" src/ 2>/dev/null | grep -v "// " | head -5; then
        log_warning "Potential hardcoded secrets found in source code"
    fi
    
    # Verify keystore if building Android
    if [[ -f "${KEYSTORE_PATH:-$DEFAULT_KEYSTORE_PATH}" ]] && [[ "${ENABLE_CODE_SIGNING_VERIFICATION:-true}" == "true" ]]; then
        log_info "Verifying Android keystore..."
        if command -v keytool >/dev/null 2>&1; then
            if ! keytool -list -keystore "${KEYSTORE_PATH:-$DEFAULT_KEYSTORE_PATH}" -storepass android >/dev/null 2>&1; then
                log_error "Invalid or corrupted keystore file"
                exit 1
            fi
            log_success "Keystore verification passed"
        else
            log_warning "keytool not found. Skipping keystore verification."
        fi
    fi
    
    log_success "Security checks completed"
}

# Code quality checks
code_quality_checks() {
    log_info "📊 Running code quality checks..."
    
    # ESLint
    if [[ -f ".eslintrc.js" ]] || [[ -f ".eslintrc.json" ]]; then
        log_info "Running ESLint..."
        yarn lint:rules || {
            log_error "ESLint checks failed"
            exit 1
        }
    fi
    
    # Prettier
    if [[ -f ".prettierrc" ]]; then
        log_info "Running Prettier check..."
        yarn lint:code-format || {
            log_error "Code formatting check failed"
            exit 1
        }
    fi
    
    # TypeScript type checking
    if [[ -f "tsconfig.json" ]]; then
        log_info "Running TypeScript type checking..."
        yarn lint:type-check || {
            log_error "TypeScript type checking failed"
            exit 1
        }
    fi
    
    # Unit tests
    if [[ -f "jest.config.js" ]] && [[ "${CI_MODE:-false}" == "true" ]]; then
        log_info "Running unit tests..."
        yarn test || {
            log_error "Unit tests failed"
            exit 1
        }
    fi
    
    log_success "Code quality checks completed"
}

# Android prerequisites
validate_android_prerequisites() {
    log_info "🤖 Validating Android prerequisites..."
    
    if [[ ! -d "android" ]]; then
        log_error "Android directory not found"
        exit 1
    fi
    
    # Check Gradle wrapper
    if [[ ! -f "android/gradlew" ]]; then
        log_error "Gradle wrapper not found"
        exit 1
    fi
    
    # Check Android SDK
    if [[ -z "${ANDROID_HOME:-}" ]] && [[ -z "${ANDROID_SDK_ROOT:-}" ]]; then
        log_warning "ANDROID_HOME or ANDROID_SDK_ROOT not set"
    fi
    
    # Check Java
    if ! command -v java >/dev/null 2>&1; then
        log_error "Java is not installed"
        exit 1
    fi
    
    local java_version
    java_version=$(java -version 2>&1 | head -n1 | cut -d'"' -f2)
    log_info "Java version: $java_version"
    
    # Validate keystore for release builds
    if [[ "${ANDROID_BUILD_TYPE:-release}" == "release" ]]; then
        if [[ ! -f "${KEYSTORE_PATH:-$DEFAULT_KEYSTORE_PATH}" ]]; then
            log_error "Release keystore not found at ${KEYSTORE_PATH:-$DEFAULT_KEYSTORE_PATH}"
            log_error "Please ensure your release keystore is properly configured"
            exit 1
        fi
    fi
    
    log_success "Android prerequisites validated"
}

# iOS prerequisites
validate_ios_prerequisites() {
    if [[ "$OSTYPE" != "darwin"* ]]; then
        log_error "iOS builds are only supported on macOS"
        exit 1
    fi
    
    log_info "🍎 Validating iOS prerequisites..."
    
    if [[ ! -d "ios" ]]; then
        log_error "iOS directory not found"
        exit 1
    fi
    
    # Check Xcode
    if ! command -v xcodebuild >/dev/null 2>&1; then
        log_error "Xcode command line tools not found"
        exit 1
    fi
    
    local xcode_version
    xcode_version=$(xcodebuild -version | head -n1)
    log_info "Xcode version: $xcode_version"
    
    # Check CocoaPods
    if ! command -v pod >/dev/null 2>&1; then
        log_error "CocoaPods not installed"
        exit 1
    fi
    
    log_info "CocoaPods version: $(pod --version)"
    
    # Validate workspace/project
    if [[ -f "${IOS_WORKSPACE:-ios/App.xcworkspace}" ]]; then
        log_info "Using Xcode workspace: ${IOS_WORKSPACE:-ios/App.xcworkspace}"
    elif [[ -f "ios/App.xcodeproj" ]]; then
        log_info "Using Xcode project: ios/App.xcodeproj"
    else
        log_error "No Xcode workspace or project found"
        exit 1
    fi
    
    log_success "iOS prerequisites validated"
}

# Clean build artifacts
clean_builds() {
    log_info "🧹 Cleaning build artifacts..."
    
    # Clean Android
    if [[ -d "android" ]]; then
        log_info "Cleaning Android builds..."
        cd android
        ./gradlew clean
        cd ..
        rm -rf android/app/build/outputs/
        log_success "Android build artifacts cleaned"
    fi
    
    # Clean iOS
    if [[ -d "ios" ]] && [[ "$OSTYPE" == "darwin"* ]]; then
        log_info "Cleaning iOS builds..."
        rm -rf ios/build
        rm -rf ios/DerivedData
        rm -rf ios/*.xcarchive
        if [[ -d "ios/Pods" ]]; then
            cd ios
            pod cache clean --all 2>/dev/null || true
            cd ..
        fi
        log_success "iOS build artifacts cleaned"
    fi
    
    # Clean Metro cache
    log_info "Cleaning Metro cache..."
    npx react-native start --reset-cache &
    local metro_pid=$!
    sleep 3
    kill $metro_pid 2>/dev/null || true
    
    # Clean node_modules if requested
    if [[ "${CLEAN_NODE_MODULES:-false}" == "true" ]]; then
        log_info "Cleaning node_modules..."
        rm -rf node_modules
        yarn install --frozen-lockfile
    fi
    
    log_success "Build artifacts cleaned"
}

# Build Android
build_android() {
    log_info "🤖 Building Android release..."
    
    validate_android_prerequisites
    
    local build_start_time
    build_start_time=$(date +%s)
    
    # Clean previous builds
    log_info "Cleaning previous Android builds..."
    cd android
    ./gradlew clean
    cd ..
    
    # Build APK
    log_info "Building release APK..."
    yarn build:android
    
    # Build AAB if configured
    if [[ "${BUILD_AAB:-true}" == "true" ]]; then
        log_info "Building release AAB (Android App Bundle)..."
        yarn build:android:bundle
    fi
    
    # Verify builds
    local apk_path="android/app/build/outputs/apk/release/app-release.apk"
    local aab_path="android/app/build/outputs/bundle/release/app-release.aab"
    
    if [[ -f "$apk_path" ]]; then
        local apk_size
        apk_size=$(du -h "$apk_path" | cut -f1)
        log_success "APK built successfully (${apk_size})"
        log_info "APK location: $apk_path"
        
        # Generate checksums
        if command -v shasum >/dev/null 2>&1; then
            local apk_sha256
            apk_sha256=$(shasum -a 256 "$apk_path" | cut -d' ' -f1)
            log_info "APK SHA256: $apk_sha256"
            echo "$apk_sha256  $apk_path" > "${apk_path}.sha256"
        fi
    else
        log_error "APK build failed"
        exit 1
    fi
    
    if [[ "${BUILD_AAB:-true}" == "true" ]] && [[ -f "$aab_path" ]]; then
        local aab_size
        aab_size=$(du -h "$aab_path" | cut -f1)
        log_success "AAB built successfully (${aab_size})"
        log_info "AAB location: $aab_path"
        
        # Generate checksums
        if command -v shasum >/dev/null 2>&1; then
            local aab_sha256
            aab_sha256=$(shasum -a 256 "$aab_path" | cut -d' ' -f1)
            log_info "AAB SHA256: $aab_sha256"
            echo "$aab_sha256  $aab_path" > "${aab_path}.sha256"
        fi
    fi
    
    local build_end_time
    build_end_time=$(date +%s)
    local build_duration=$((build_end_time - build_start_time))
    log_success "Android build completed in ${build_duration} seconds"
    
    # Send success notification
    send_notification "Android Build Success" "Android build completed successfully in ${build_duration} seconds"
}

# Build iOS
build_ios() {
    validate_ios_prerequisites
    
    log_info "🍎 Building iOS release..."
    
    local build_start_time
    build_start_time=$(date +%s)
    
    # Install/update pods
    log_info "Installing CocoaPods dependencies..."
    yarn pod-install
    
    # Clean iOS builds
    log_info "Cleaning iOS builds..."
    rm -rf ios/build
    rm -rf ios/*.xcarchive
    
    # Build iOS archive
    log_info "Building iOS release archive..."
    yarn build:ios
    
    # Verify build
    local archive_path="ios/App.xcarchive"
    if [[ -d "$archive_path" ]]; then
        log_success "iOS archive built successfully"
        log_info "Archive location: $archive_path"
        log_info "To upload to App Store:"
        log_info "1. Open Xcode"
        log_info "2. Go to Window > Organizer"
        log_info "3. Select the archive and click 'Distribute App'"
    else
        log_error "iOS build failed"
        exit 1
    fi
    
    local build_end_time
    build_end_time=$(date +%s)
    local build_duration=$((build_end_time - build_start_time))
    log_success "iOS build completed in ${build_duration} seconds"
    
    # Send success notification
    send_notification "iOS Build Success" "iOS build completed successfully in ${build_duration} seconds"
}

# Generate build report
generate_build_report() {
    local report_file="$LOG_DIR/build_report_${TIMESTAMP}.json"
    
    log_info "📊 Generating build report..."
    
    # Get project information
    local project_name project_version react_native_version
    if command -v jq >/dev/null 2>&1; then
        project_name=$(jq -r '.name' package.json)
        project_version=$(jq -r '.version' package.json)
        react_native_version=$(jq -r '.dependencies."react-native"' package.json)
    else
        project_name=$(grep '"name"' package.json | cut -d'"' -f4)
        project_version=$(grep '"version"' package.json | cut -d'"' -f4)
        react_native_version=$(grep '"react-native"' package.json | cut -d'"' -f4)
    fi
    
    # Create JSON report
    cat > "$report_file" << EOF
{
  "buildInfo": {
    "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
    "projectName": "$project_name",
    "projectVersion": "$project_version",
    "reactNativeVersion": "$react_native_version",
    "buildUser": "$(whoami)",
    "buildHost": "$(hostname)",
    "gitCommit": "$(git rev-parse HEAD 2>/dev/null || echo 'unknown')",
    "gitBranch": "$(git branch --show-current 2>/dev/null || echo 'unknown')"
  },
  "environment": {
    "nodeVersion": "$(node --version)",
    "yarnVersion": "$(yarn --version)",
    "platform": "$OSTYPE"
  }
}
EOF
    
    log_success "Build report generated: $report_file"
}

# Function to show build info
show_build_info() {
    log_info "📋 Build Information:"
    echo "Project: $(grep '"name"' package.json | cut -d'"' -f4)"
    echo "Version: $(grep '"version"' package.json | cut -d'"' -f4)"
    echo "React Native: $(grep '"react-native"' package.json | cut -d'"' -f4)"
    echo "Node: $(node --version)"
    echo "Yarn: $(yarn --version)"
    
    if [[ "$OSTYPE" == "darwin"* ]]; then
        echo "Xcode: $(xcodebuild -version | head -n1)"
    fi
    
    if command -v java &> /dev/null; then
        echo "Java: $(java -version 2>&1 | head -n1)"
    fi
    echo ""
}

# Function to run release on device
run_release() {
    log_info "🎯 Choose platform to run release build:"
    echo "1) Android"
    echo "2) iOS"
    read -p "Enter your choice (1-2): " platform_choice
    
    case $platform_choice in
        1)
            log_info "📱 Running Android release..."
            yarn android:release
            ;;
        2)
            if [[ "$OSTYPE" != "darwin"* ]]; then
                log_error "iOS is only supported on macOS"
                exit 1
            fi
            log_info "🍎 Running iOS release..."
            yarn ios:release
            ;;
        *)
            log_error "Invalid choice!"
            exit 1
            ;;
    esac
}

# Main execution
main() {
    # Initialize logging
    init_logging
    
    # Load configuration
    load_config
    
    # Show build info
    show_build_info
    
    # Validate environment
    validate_environment
    
    # Security checks
    security_checks
    
    # Code quality checks (if not in CI mode)
    if [[ "${CI_MODE:-false}" != "true" ]]; then
        code_quality_checks
    fi
    
    # Main menu
    log_info "Choose an option:"
    echo "1) Build Android Release (APK + AAB)"
    echo "2) Build iOS Release (Archive)"
    echo "3) Build Both (Android + iOS)"
    echo "4) Run Release on Device"
    echo "5) Clean All Build Artifacts"
    echo "6) Generate Build Report"
    echo "7) Exit"
    
    read -p "Enter your choice (1-7): " choice
    
    case $choice in
        1)
            build_android
            generate_build_report
            ;;
        2)
            build_ios
            generate_build_report
            ;;
        3)
            build_android
            echo ""
            build_ios
            generate_build_report
            ;;
        4)
            run_release
            ;;
        5)
            clean_builds
            ;;
        6)
            generate_build_report
            ;;
        7)
            log_success "👋 Goodbye!"
            exit 0
            ;;
        *)
            log_error "Invalid choice!"
            exit 1
            ;;
    esac
    
    echo ""
    log_success "🎉 Release build process completed!"
}

# Run main function
main "$@"
