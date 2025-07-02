import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SEO } from "@/components/seo"
import Link from "next/link"
import { ArrowLeft, Target, Zap, Shield, Code, CheckCircle, AlertTriangle } from "lucide-react"

export default function BestPractices() {
  return (
    <>
      <SEO 
        title="Best Practices"
        description="Development guidelines, coding standards, performance optimization, and testing best practices for React Native Boilerplate."
      />
      
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center space-x-4">
              <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold">Best Practices</h1>
                <p className="text-muted-foreground">Development guidelines and coding standards</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="mr-2 h-6 w-6" />
                  Development Guidelines
                </CardTitle>
                <CardDescription>
                  Follow these best practices to maintain code quality, performance, and maintainability in your React Native application.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <Code className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-2" />
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200">Code Quality</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">Clean, readable code</p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                    <Zap className="h-8 w-8 text-green-600 dark:text-green-400 mb-2" />
                    <h4 className="font-semibold text-green-800 dark:text-green-200">Performance</h4>
                    <p className="text-sm text-green-700 dark:text-green-300">Optimized for speed</p>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                    <Shield className="h-8 w-8 text-purple-600 dark:text-purple-400 mb-2" />
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200">Security</h4>
                    <p className="text-sm text-purple-700 dark:text-purple-300">Secure by design</p>
                  </div>
                  <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
                    <CheckCircle className="h-8 w-8 text-orange-600 dark:text-orange-400 mb-2" />
                    <h4 className="font-semibold text-orange-800 dark:text-orange-200">Testing</h4>
                    <p className="text-sm text-orange-700 dark:text-orange-300">Comprehensive testing</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Code Quality */}
            <Card>
              <CardHeader>
                <CardTitle>Code Quality Standards</CardTitle>
                <CardDescription>
                  Writing clean, maintainable, and readable code
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">TypeScript Best Practices</h4>
                    <div className="grid gap-4">
                      <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                        <h5 className="font-medium text-green-800 dark:text-green-200 mb-2">✅ Good Practices</h5>
                        <pre className="text-sm text-green-700 dark:text-green-300 overflow-x-auto">
{`// Define clear interfaces
interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

// Use strict typing for props
interface ButtonProps {
  title: string
  onPress: () => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

// Leverage union types
type Status = 'loading' | 'success' | 'error'

// Use generics for reusable components
interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}`}
                        </pre>
                      </div>
                      
                      <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                        <h5 className="font-medium text-red-800 dark:text-red-200 mb-2">❌ Avoid</h5>
                        <pre className="text-sm text-red-700 dark:text-red-300 overflow-x-auto">
{`// Don't use 'any' type
const data: any = fetchUserData()

// Don't skip prop validation
const Button = ({ title, onPress }) => { ... }

// Don't use unclear naming
interface Props {
  a: string
  b: number
  c: boolean
}`}
                        </pre>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Component Structure</h4>
                    <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
{`// Good component structure
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useTheme } from '@/hooks/useTheme'
import { ButtonProps } from './Button.types'
import { styles } from './Button.styles'

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  testID
}) => {
  const { colors } = useTheme()
  
  const buttonStyle = [
    styles.button,
    styles[variant],
    disabled && styles.disabled,
    { borderColor: colors.border }
  ]
  
  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      <Text style={[styles.text, { color: colors.text }]}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

Button.displayName = 'Button'`}
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">File Organization</h4>
                    <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
{`components/atoms/Button/
├── Button.tsx           # Main component
├── Button.types.ts      # TypeScript interfaces
├── Button.styles.ts     # Styles (if complex)
├── Button.test.tsx      # Unit tests
├── Button.stories.tsx   # Storybook stories (optional)
└── index.ts            # Barrel export

// index.ts
export { Button } from './Button'
export type { ButtonProps } from './Button.types'`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Optimization */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="mr-2 h-6 w-6" />
                  Performance Optimization
                </CardTitle>
                <CardDescription>
                  Techniques to ensure smooth and fast app performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">React Optimization</h4>
                    <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
{`// Use React.memo for expensive components
export const ExpensiveComponent = React.memo<Props>(({ data, onAction }) => {
  // Expensive rendering logic
  return <ComplexView data={data} onAction={onAction} />
}, (prevProps, nextProps) => {
  // Custom comparison function
  return prevProps.data.id === nextProps.data.id
})

// Use useCallback for event handlers
const MyComponent = () => {
  const [count, setCount] = useState(0)
  
  const handlePress = useCallback(() => {
    setCount(prev => prev + 1)
  }, [])
  
  return <Button onPress={handlePress} title={\`Count: \${count}\`} />
}

// Use useMemo for expensive calculations
const MyComponent = ({ items }) => {
  const expensiveValue = useMemo(() => {
    return items.reduce((sum, item) => sum + item.value, 0)
  }, [items])
  
  return <Text>{expensiveValue}</Text>
}`}
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">List Performance</h4>
                    <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
{`// Use FlashList for better performance
import { FlashList } from '@shopify/flash-list'

const ItemsList = ({ data }) => {
  const renderItem = useCallback(({ item }) => (
    <ItemComponent key={item.id} item={item} />
  ), [])
  
  return (
    <FlashList
      data={data}
      renderItem={renderItem}
      estimatedItemSize={100}
      keyExtractor={(item) => item.id}
      // Optimize rendering
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      updateCellsBatchingPeriod={50}
      windowSize={10}
    />
  )
}`}
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Image Optimization</h4>
                    <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
{`// Use FastImage for better image performance
import FastImage from 'react-native-fast-image'

const OptimizedImage = ({ uri, style }) => (
  <FastImage
    style={style}
    source={{
      uri,
      priority: FastImage.priority.normal,
      cache: FastImage.cacheControl.immutable,
    }}
    resizeMode={FastImage.resizeMode.cover}
    fallback={true}
  />
)`}
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Bundle Size Optimization</h4>
                    <div className="space-y-2">
                      <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded border border-blue-200 dark:border-blue-800">
                        <strong className="text-blue-800 dark:text-blue-200">Tree Shaking:</strong>
                        <span className="text-blue-700 dark:text-blue-300 ml-2">Import only what you need</span>
                      </div>
                      <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded border border-green-200 dark:border-green-800">
                        <strong className="text-green-800 dark:text-green-200">Code Splitting:</strong>
                        <span className="text-green-700 dark:text-green-300 ml-2">Use dynamic imports for large modules</span>
                      </div>
                      <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded border border-purple-200 dark:border-purple-800">
                        <strong className="text-purple-800 dark:text-purple-200">Asset Optimization:</strong>
                        <span className="text-purple-700 dark:text-purple-300 ml-2">Compress images and use appropriate formats</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testing Best Practices */}
            <Card>
              <CardHeader>
                <CardTitle>Testing Guidelines</CardTitle>
                <CardDescription>
                  Comprehensive testing strategies for reliable applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Testing Pyramid</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 border rounded-lg text-center">
                        <div className="text-2xl mb-2">🔼</div>
                        <h5 className="font-semibold mb-1">Unit Tests</h5>
                        <p className="text-sm text-muted-foreground">70% - Test individual functions and components</p>
                      </div>
                      <div className="p-4 border rounded-lg text-center">
                        <div className="text-2xl mb-2">🔹</div>
                        <h5 className="font-semibold mb-1">Integration Tests</h5>
                        <p className="text-sm text-muted-foreground">20% - Test component interactions</p>
                      </div>
                      <div className="p-4 border rounded-lg text-center">
                        <div className="text-2xl mb-2">🔸</div>
                        <h5 className="font-semibold mb-1">E2E Tests</h5>
                        <p className="text-sm text-muted-foreground">10% - Test complete user flows</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Unit Testing Example</h4>
                    <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
{`// Button.test.tsx
import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { Button } from './Button'

describe('Button Component', () => {
  it('renders correctly with title', () => {
    const { getByText } = render(
      <Button title="Click me" onPress={() => {}} />
    )
    expect(getByText('Click me')).toBeTruthy()
  })

  it('calls onPress when pressed', () => {
    const mockOnPress = jest.fn()
    const { getByText } = render(
      <Button title="Click me" onPress={mockOnPress} />
    )
    
    fireEvent.press(getByText('Click me'))
    expect(mockOnPress).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    const mockOnPress = jest.fn()
    const { getByText } = render(
      <Button title="Click me" onPress={mockOnPress} disabled />
    )
    
    fireEvent.press(getByText('Click me'))
    expect(mockOnPress).not.toHaveBeenCalled()
  })
})`}
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Hook Testing</h4>
                    <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
{`// useAuth.test.ts
import { renderHook, act } from '@testing-library/react-native'
import { useAuth } from './useAuth'

describe('useAuth Hook', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useAuth())
    
    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
  })

  it('should login user correctly', async () => {
    const { result } = renderHook(() => useAuth())
    
    await act(async () => {
      await result.current.login('user@example.com', 'password')
    })
    
    expect(result.current.isAuthenticated).toBe(true)
    expect(result.current.user).not.toBeNull()
  })
})`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Practices */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-6 w-6" />
                  Security Best Practices
                </CardTitle>
                <CardDescription>
                  Protecting your application and user data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Data Protection</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          Encrypt sensitive data in storage
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          Use HTTPS for all API communications
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          Implement proper authentication flows
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          Validate all user inputs
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Common Vulnerabilities</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <AlertTriangle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                          Storing secrets in plain text
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                          Insecure data transmission
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                          Weak authentication mechanisms
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                          Insufficient input validation
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Secure Storage Example</h4>
                    <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
{`// services/secureStorage.ts
import { MMKV } from 'react-native-mmkv'

// Create encrypted storage instance
const secureStorage = new MMKV({
  id: 'secure-storage',
  encryptionKey: 'your-encryption-key'
})

export const SecureStorage = {
  setItem: (key: string, value: string) => {
    secureStorage.set(key, value)
  },
  
  getItem: (key: string): string | undefined => {
    return secureStorage.getString(key)
  },
  
  removeItem: (key: string) => {
    secureStorage.delete(key)
  },
  
  clear: () => {
    secureStorage.clearAll()
  }
}`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Development Workflow */}
            <Card>
              <CardHeader>
                <CardTitle>Development Workflow</CardTitle>
                <CardDescription>
                  Efficient development processes and tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Git Workflow</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded border border-blue-200 dark:border-blue-800">
                        <strong className="text-blue-800 dark:text-blue-200">Branch Naming:</strong>
                        <span className="text-blue-700 dark:text-blue-300 ml-2">feature/user-authentication, fix/login-bug, chore/update-deps</span>
                      </div>
                      <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded border border-green-200 dark:border-green-800">
                        <strong className="text-green-800 dark:text-green-200">Commit Messages:</strong>
                        <span className="text-green-700 dark:text-green-300 ml-2">Use conventional commits (feat:, fix:, docs:, style:, refactor:, test:, chore:)</span>
                      </div>
                      <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded border border-purple-200 dark:border-purple-800">
                        <strong className="text-purple-800 dark:text-purple-200">Code Review:</strong>
                        <span className="text-purple-700 dark:text-purple-300 ml-2">All changes go through pull request review</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Quality Gates</h4>
                    <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
{`# Pre-commit hooks (Husky)
"husky": {
  "hooks": {
    "pre-commit": "lint-staged",
    "pre-push": "npm test"
  }
}

# Lint-staged configuration
"lint-staged": {
  "*.{ts,tsx}": [
    "eslint --fix",
    "prettier --write"
  ],
  "*.{json,md}": [
    "prettier --write"
  ]
}`}
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">CI/CD Pipeline</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 border rounded-lg">
                        <h5 className="font-semibold mb-2">Build</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Install dependencies</li>
                          <li>• Type checking</li>
                          <li>• Build app bundle</li>
                        </ul>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h5 className="font-semibold mb-2">Test</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Run unit tests</li>
                          <li>• Code coverage check</li>
                          <li>• Integration tests</li>
                        </ul>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h5 className="font-semibold mb-2">Deploy</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Build release</li>
                          <li>• Deploy to stores</li>
                          <li>• Update documentation</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Checklist */}
            <Card>
              <CardHeader>
                <CardTitle>Development Checklist</CardTitle>
                <CardDescription>
                  Use this checklist before releasing new features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Code Quality</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        TypeScript types are properly defined
                      </li>
                      <li className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        No ESLint warnings or errors
                      </li>
                      <li className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Code is properly formatted
                      </li>
                      <li className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Components have proper prop validation
                      </li>
                      <li className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        No unused imports or variables
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Testing & Performance</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Unit tests are written and passing
                      </li>
                      <li className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Performance is acceptable
                      </li>
                      <li className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Memory leaks are checked
                      </li>
                      <li className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Accessibility is implemented
                      </li>
                      <li className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Error handling is proper
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Link href="/docs/configuration" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h4 className="font-semibold mb-2">Configuration</h4>
                    <p className="text-sm text-muted-foreground">Learn about app configuration and environment setup</p>
                  </Link>
                  <Link href="/docs/development" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h4 className="font-semibold mb-2">Development Guide</h4>
                    <p className="text-sm text-muted-foreground">Detailed development workflow and tools</p>
                  </Link>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </>
  )
} 