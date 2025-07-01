# 📦 React Native Template - Publish & Usage Guide

This guide explains how to publish your React Native template and use it to create new projects.

## 🚀 Publishing Your Template

### Prerequisites

1. **NPM Account**: Create an account at [npmjs.com](https://www.npmjs.com/)
2. **Login to NPM**: Run `npm login` in your terminal
3. **Git Repository**: Ensure your template is in a Git repository

### Step 1: Prepare for Publishing

```bash
# Make sure all files are committed
git add .
git commit -m "Initial template setup"

# Test the template locally
npm run test
```

### Step 2: Publish to NPM

```bash
# Publish the template
npm run publish:npm

# Or manually
npm publish --access public
```

### Step 3: Verify Publication

Visit your package page: `https://www.npmjs.com/package/@sohantalukder/react-native-boilerplate`

## 🛠️ Using Your Template

### Method 1: Direct Template Usage

```bash
npx @react-native-community/cli@latest init MyAwesomeApp --template @sohantalukder/react-native-boilerplate
```

### Method 2: Local Testing (Before Publishing)

```bash
# Test locally using file path
npx @react-native-community/cli@latest init TestApp --template file:///path/to/your/template
```

## 🎉 Congratulations!

Your React Native template is now ready to use! 