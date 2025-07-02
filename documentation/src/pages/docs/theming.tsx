import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SEO } from "@/components/seo"
import Link from "next/link"
import { ArrowLeft, Palette, Moon, Sun, Code, Smartphone } from "lucide-react"

export default function Theming() {
  return (
    <>
      <SEO 
        title="Theming Guide"
        description="Learn how to customize themes, colors, typography, and implement dark/light mode in your React Native Boilerplate app."
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
                <h1 className="text-2xl font-bold">Theming Guide</h1>
                <p className="text-muted-foreground">Customize your app's appearance and implement theme switching</p>
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
                  <Palette className="mr-2 h-6 w-6" />
                  Theme System Overview
                </CardTitle>
                <CardDescription>
                  The React Native Boilerplate includes a comprehensive theming system that supports dynamic theme switching, responsive design, and consistent styling across your app.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold mb-2">🎨 Dynamic Themes</h4>
                      <p className="text-sm text-muted-foreground">Switch between light and dark themes at runtime</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold mb-2">📱 Responsive Design</h4>
                      <p className="text-sm text-muted-foreground">Adaptive layouts for different screen sizes</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold mb-2">🎯 Type Safety</h4>
                      <p className="text-sm text-muted-foreground">TypeScript support for theme properties</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold mb-2">🔧 Customizable</h4>
                      <p className="text-sm text-muted-foreground">Easy to extend and modify</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Theme Structure */}
            <Card>
              <CardHeader>
                <CardTitle>Theme Structure</CardTitle>
                <CardDescription>
                  Understanding the theme system architecture
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
{`src/theme/
├── index.ts          # Main theme exports
├── colors.ts         # Color definitions
├── typography.ts     # Font and text styles
├── spacing.ts        # Margins, padding, gaps
├── shadows.ts        # Shadow definitions
└── components/       # Component-specific styles
    ├── button.ts
    ├── card.ts
    └── input.ts`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* Colors */}
            <Card>
              <CardHeader>
                <CardTitle>Color System</CardTitle>
                <CardDescription>
                  Defining and using colors in your theme
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Color Definitions</h4>
                    <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
{`// src/theme/colors.ts
export const colors = {
  light: {
    primary: '#007AFF',
    secondary: '#5856D6',
    background: '#FFFFFF',
    surface: '#F2F2F7',
    text: '#000000',
    textSecondary: '#8E8E93',
    border: '#C6C6C8',
    error: '#FF3B30',
    warning: '#FF9500',
    success: '#34C759',
  },
  dark: {
    primary: '#0A84FF',
    secondary: '#5E5CE6',
    background: '#000000',
    surface: '#1C1C1E',
    text: '#FFFFFF',
    textSecondary: '#8E8E93',
    border: '#38383A',
    error: '#FF453A',
    warning: '#FF9F0A',
    success: '#30D158',
  },
};`}
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Using Colors</h4>
                    <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
{`// In your components
import { useTheme } from '@/hooks/useTheme';

const MyComponent = () => {
  const { colors } = useTheme();
  
  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>
        Hello World
      </Text>
    </View>
  );
};`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Typography */}
            <Card>
              <CardHeader>
                <CardTitle>Typography</CardTitle>
                <CardDescription>
                  Consistent text styling across your app
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Typography Scale</h4>
                    <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
{`// src/theme/typography.ts
export const typography = {
  heading1: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
  },
  heading2: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
};`}
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Usage Example</h4>
                    <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
{`import { useTheme } from '@/hooks/useTheme';

const TextExample = () => {
  const { typography, colors } = useTheme();
  
  return (
    <>
      <Text style={[typography.heading1, { color: colors.text }]}>
        Main Title
      </Text>
      <Text style={[typography.body, { color: colors.textSecondary }]}>
        Body text content
      </Text>
    </>
  );
};`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dark/Light Mode */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Moon className="mr-2 h-5 w-5" />
                  Dark/Light Mode
                </CardTitle>
                <CardDescription>
                  Implementing theme switching functionality
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Theme Provider Setup</h4>
                    <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
{`// src/contexts/ThemeContext.tsx
import React, { createContext, useContext, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: typeof colors.light;
  typography: typeof typography;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  const value = {
    theme,
    toggleTheme,
    colors: colors[theme],
    typography,
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};`}
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Theme Toggle Component</h4>
                    <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
{`// src/components/ThemeToggle.tsx
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import Icon from 'react-native-vector-icons/Ionicons';

export const ThemeToggle = () => {
  const { theme, toggleTheme, colors } = useTheme();
  
  return (
    <TouchableOpacity 
      onPress={toggleTheme}
      style={{
        padding: 12,
        backgroundColor: colors.surface,
        borderRadius: 8,
      }}
    >
      <Icon 
        name={theme === 'light' ? 'moon' : 'sunny'} 
        size={24} 
        color={colors.text} 
      />
    </TouchableOpacity>
  );
};`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Component Styling */}
            <Card>
              <CardHeader>
                <CardTitle>Component Styling</CardTitle>
                <CardDescription>
                  Creating reusable styled components
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Styled Button Example</h4>
                    <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
{`// src/components/Button.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ 
  title, 
  onPress, 
  variant = 'primary' 
}) => {
  const { colors, typography } = useTheme();
  
  const buttonStyle = {
    backgroundColor: variant === 'primary' ? colors.primary : colors.secondary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center' as const,
  };
  
  const textStyle = {
    ...typography.body,
    color: '#FFFFFF',
    fontWeight: '600' as const,
  };
  
  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Best Practices */}
            <Card>
              <CardHeader>
                <CardTitle>Best Practices</CardTitle>
                <CardDescription>
                  Guidelines for effective theming
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4">
                    <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                      <h5 className="font-medium text-green-800 dark:text-green-200 mb-2">✅ Do</h5>
                      <ul className="space-y-1 text-sm text-green-700 dark:text-green-300">
                        <li>• Use semantic color names (primary, secondary, error)</li>
                        <li>• Define consistent spacing scales</li>
                        <li>• Test both light and dark themes</li>
                        <li>• Use TypeScript for theme type safety</li>
                        <li>• Keep theme definitions centralized</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                      <h5 className="font-medium text-red-800 dark:text-red-200 mb-2">❌ Don't</h5>
                      <ul className="space-y-1 text-sm text-red-700 dark:text-red-300">
                        <li>• Hardcode colors in components</li>
                        <li>• Use arbitrary spacing values</li>
                        <li>• Forget to test accessibility</li>
                        <li>• Mix theme systems</li>
                        <li>• Override theme values inline</li>
                      </ul>
                    </div>
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
                    <p className="text-sm text-muted-foreground">Learn about app configuration options</p>
                  </Link>
                  <Link href="/docs/development" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h4 className="font-semibold mb-2">Development Guide</h4>
                    <p className="text-sm text-muted-foreground">Development workflow and best practices</p>
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