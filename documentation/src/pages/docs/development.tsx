import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Terminal, Bug, TestTube, Zap, Play, Code } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { SEO } from "@/components/seo"

export default function Development() {
  return (
    <>
      <SEO 
        title="Development Guide"
        description="Learn the development workflow, debugging techniques, testing strategies, and performance optimization for React Native development."
        url="https://sohantalukder.github.io/react-native-boilerplate/docs/development/"
        type="article"
      />

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/docs" className="text-muted-foreground hover:text-foreground inline-flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Documentation
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            {/* Page Header */}
            <div className="mb-12 text-center">
              <h1 className="text-4xl font-bold tracking-tight mb-4">Development Guide</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Learn the development workflow, best practices, and tools for building scalable React Native applications
              </p>
            </div>

            {/* Development Sections */}
            <div className="space-y-8">
              {/* Development Workflow */}
              <DevSection
                icon={<Terminal className="h-6 w-6" />}
                title="Development Workflow"
                description="Essential commands and development setup"
              >
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Starting Development</h4>
                    <div className="grid gap-4">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h5 className="font-medium mb-2 flex items-center">
                          <Play className="h-4 w-4 mr-2 text-green-500" />
                          Start Metro Bundler
                        </h5>
                        <pre className="text-sm bg-background p-3 rounded border">npm start</pre>
                        <p className="text-sm text-muted-foreground mt-2">Starts the Metro development server</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <h5 className="font-medium mb-2">iOS Development</h5>
                          <pre className="text-sm bg-background p-3 rounded border">npm run ios</pre>
                          <p className="text-sm text-muted-foreground mt-2">Run on iOS simulator</p>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <h5 className="font-medium mb-2">Android Development</h5>
                          <pre className="text-sm bg-background p-3 rounded border">npm run android</pre>
                          <p className="text-sm text-muted-foreground mt-2">Run on Android emulator</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Hot Reload & Fast Refresh</h4>
                    <div className="bg-accent/50 p-4 rounded-lg border border-accent">
                      <p className="text-sm mb-2">React Native Fast Refresh is enabled by default. Changes are reflected instantly:</p>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Component state is preserved during edits</li>
                        <li>• Only the changed components re-render</li>
                        <li>• Errors show helpful overlay with stack traces</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </DevSection>

              {/* Code Quality */}
              <DevSection
                icon={<Code className="h-6 w-6" />}
                title="Code Quality & Linting"
                description="Maintain consistent code quality with automated tools"
              >
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Linting & Formatting</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h5 className="font-medium mb-2">ESLint</h5>
                        <pre className="text-sm bg-background p-3 rounded border mb-2">npm run lint</pre>
                        <p className="text-xs text-muted-foreground">Check for code quality issues</p>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h5 className="font-medium mb-2">Prettier</h5>
                        <pre className="text-sm bg-background p-3 rounded border mb-2">npm run format</pre>
                        <p className="text-xs text-muted-foreground">Auto-format code style</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">TypeScript</h4>
                    <div className="space-y-4">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h5 className="font-medium mb-2">Type Checking</h5>
                        <pre className="text-sm bg-background p-3 rounded border">npm run type-check</pre>
                      </div>
                      
                      <div>
                        <h5 className="font-medium mb-2">Type Definition Example</h5>
                        <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
{`// src/types/user.ts
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
}

export interface CreateUserRequest {
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </DevSection>

              {/* Testing */}
              <DevSection
                icon={<TestTube className="h-6 w-6" />}
                title="Testing"
                description="Unit tests, integration tests, and E2E testing setup"
              >
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Testing Commands</h4>
                    <div className="grid gap-4">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h5 className="font-medium mb-2">Run All Tests</h5>
                        <pre className="text-sm bg-background p-3 rounded border">npm test</pre>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <h5 className="font-medium mb-2">Watch Mode</h5>
                          <pre className="text-sm bg-background p-3 rounded border">npm run test:watch</pre>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <h5 className="font-medium mb-2">Coverage Report</h5>
                          <pre className="text-sm bg-background p-3 rounded border">npm run test:coverage</pre>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Test Examples</h4>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium mb-2">Component Testing</h5>
                        <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
{`// __tests__/components/Button.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '@/components/ui/Button';

describe('Button Component', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <Button title="Press me" onPress={() => {}} />
    );
    
    expect(getByText('Press me')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <Button title="Press me" onPress={mockOnPress} />
    );
    
    fireEvent.press(getByText('Press me'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});`}
                        </pre>
                      </div>

                      <div>
                        <h5 className="font-medium mb-2">API Testing</h5>
                        <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
{`// __tests__/services/api.test.ts
import { apiClient } from '@/services/api';
import { mockServer } from '../mocks/server';

describe('API Client', () => {
  beforeAll(() => mockServer.listen());
  afterEach(() => mockServer.resetHandlers());
  afterAll(() => mockServer.close());

  it('fetches user data successfully', async () => {
    const user = await apiClient.getUser('123');
    
    expect(user).toEqual({
      id: '123',
      name: 'John Doe',
      email: 'john@example.com'
    });
  });
});`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </DevSection>

              {/* Debugging */}
              <DevSection
                icon={<Bug className="h-6 w-6" />}
                title="Debugging"
                description="Tools and techniques for debugging React Native apps"
              >
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Debug Tools</h4>
                    <div className="grid gap-4">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h5 className="font-medium mb-2">React Native Debugger</h5>
                        <p className="text-sm text-muted-foreground mb-2">
                          Standalone app with React DevTools, Redux DevTools, and network inspect
                        </p>
                        <pre className="text-sm bg-background p-3 rounded border">brew install react-native-debugger</pre>
                      </div>

                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h5 className="font-medium mb-2">Flipper Integration</h5>
                        <p className="text-sm text-muted-foreground mb-2">
                          Advanced debugging with network, layout, and crash inspection
                        </p>
                        <pre className="text-sm bg-background p-3 rounded border">npx react-native doctor</pre>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Debug Console</h4>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium mb-2">Enable Debug Mode</h5>
                        <div className="bg-accent/50 p-4 rounded-lg border border-accent">
                          <p className="text-sm mb-2">In development mode, shake your device or press:</p>
                          <ul className="text-sm space-y-1 text-muted-foreground">
                            <li>• <strong>iOS Simulator:</strong> Cmd + D</li>
                            <li>• <strong>Android Emulator:</strong> Cmd + M (Mac) or Ctrl + M (Windows/Linux)</li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium mb-2">Logging Best Practices</h5>
                        <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
{`// src/utils/logger.ts
export const logger = {
  debug: (message: string, ...args: any[]) => {
    if (__DEV__) {
      console.log('🐛 DEBUG:', message, ...args);
    }
  },
  
  info: (message: string, ...args: any[]) => {
    if (__DEV__) {
      console.info('ℹ️ INFO:', message, ...args);
    }
  },
  
  warn: (message: string, ...args: any[]) => {
    console.warn('⚠️ WARN:', message, ...args);
  },
  
  error: (message: string, error?: Error) => {
    console.error('❌ ERROR:', message, error);
    // Report to crash analytics in production
  }
};`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </DevSection>

              {/* Performance */}
              <DevSection
                icon={<Zap className="h-6 w-6" />}
                title="Performance Optimization"
                description="Tips and tools for optimizing app performance"
              >
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Performance Monitoring</h4>
                    <div className="grid gap-4">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h5 className="font-medium mb-2">Performance Monitor</h5>
                        <pre className="text-sm bg-background p-3 rounded border">
{`// Enable in development
import {Settings} from 'react-native';
Settings.set({showFPS: true});`}
                        </pre>
                      </div>

                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h5 className="font-medium mb-2">Bundle Analysis</h5>
                        <pre className="text-sm bg-background p-3 rounded border">npx react-native bundle --dev false --analyze</pre>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Optimization Tips</h4>
                    <div className="space-y-4">
                      <div className="bg-accent/50 p-4 rounded-lg border border-accent">
                        <h5 className="font-medium mb-2">React Performance</h5>
                        <ul className="text-sm space-y-2 text-muted-foreground">
                          <li>• Use React.memo() for expensive components</li>
                          <li>• Implement useMemo() and useCallback() for heavy computations</li>
                          <li>• Optimize FlatList with getItemLayout and keyExtractor</li>
                          <li>• Use InteractionManager for heavy tasks</li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-medium mb-2">Image Optimization</h5>
                        <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
{`// Optimize images
<Image
  source={{uri: imageUrl}}
  style={styles.image}
  resizeMode="cover"
  // Faster loading
  progressiveRenderingEnabled={true}
  // Memory optimization
  defaultSource={require('./placeholder.png')}
/>`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </DevSection>
            </div>

            {/* Next Steps */}
            <div className="mt-16 text-center p-8 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border">
              <h2 className="text-2xl font-semibold mb-4">Ready to Build?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                You now have everything you need to start developing your React Native application. Explore the project structure and configuration options.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/docs/project-structure" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 transition-colors">
                  Project Structure
                </Link>
                <Link href="/docs/configuration" className="inline-flex items-center justify-center px-6 py-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors rounded-md">
                  Configuration
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function DevSection({ 
  icon, 
  title, 
  description, 
  children 
}: { 
  icon: React.ReactNode
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <Card className="border-0 shadow-sm bg-card/50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-xl">
          <div className="mr-3 p-2 bg-primary/10 text-primary rounded-lg">
            {icon}
          </div>
          {title}
        </CardTitle>
        <CardDescription className="text-base">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        {children}
      </CardContent>
    </Card>
  )
} 