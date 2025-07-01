import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Settings, Code, Palette, Globe } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { SEO } from "@/components/seo"

export default function Configuration() {
  return (
    <>
      <SEO 
        title="Configuration"
        description="Learn how to configure themes, API endpoints, environment variables, and internationalization in the React Native Boilerplate."
        url="https://sohantalukder.github.io/react-native-boilerplate/docs/configuration/"
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
              <h1 className="text-4xl font-bold tracking-tight mb-4">Configuration</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Configure your app settings, environment variables, and build configurations to customize your React Native application
              </p>
            </div>

            {/* Configuration Sections */}
            <div className="space-y-8">
              {/* Environment Variables */}
              <ConfigSection
                icon={<Settings className="h-6 w-6" />}
                title="Environment Variables"
                description="Configure environment-specific settings"
              >
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Creating Environment Files</h4>
                    <p className="text-muted-foreground mb-4">Create different environment files for different stages:</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h5 className="font-medium mb-2">.env.development</h5>
                        <pre className="text-sm bg-background p-3 rounded border">
{`API_URL=http://localhost:3000/api
APP_ENV=development
DEBUG_MODE=true`}
                        </pre>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h5 className="font-medium mb-2">.env.production</h5>
                        <pre className="text-sm bg-background p-3 rounded border">
{`API_URL=https://api.yourapp.com
APP_ENV=production
DEBUG_MODE=false`}
                        </pre>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Using Environment Variables</h4>
                    <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
{`// src/config/env.ts
import Config from 'react-native-config';

export const env = {
  API_URL: Config.API_URL || 'http://localhost:3000/api',
  APP_ENV: Config.APP_ENV || 'development',
  DEBUG_MODE: Config.DEBUG_MODE === 'true',
};`}
                    </pre>
                  </div>
                </div>
              </ConfigSection>

              {/* App Configuration */}
              <ConfigSection
                icon={<Palette className="h-6 w-6" />}
                title="App Configuration"
                description="Basic app settings and metadata"
              >
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">App Config File</h4>
                    <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
{`// src/config/app.ts
export const appConfig = {
  name: 'Your App Name',
  version: '1.0.0',
  bundleId: 'com.yourcompany.yourapp',
  
  // Navigation
  initialRouteName: 'Home',
  
  // Theme
  defaultTheme: 'light',
  
  // Features
  features: {
    darkMode: true,
    biometricAuth: true,
    pushNotifications: true,
  },
  
  // API
  api: {
    timeout: 10000,
    retries: 3,
  },
};`}
                    </pre>
                  </div>
                </div>
              </ConfigSection>

              {/* Build Configuration */}
              <ConfigSection
                icon={<Code className="h-6 w-6" />}
                title="Build Configuration"
                description="Metro, Babel, and build settings"
              >
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Metro Configuration</h4>
                    <p className="text-muted-foreground mb-4">Configure Metro bundler for optimal performance:</p>
                    <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
{`// metro.config.js
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: getDefaultConfig(__dirname).resolver.assetExts.filter(
      ext => ext !== 'svg',
    ),
    sourceExts: [...getDefaultConfig(__dirname).resolver.sourceExts, 'svg'],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);`}
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Babel Configuration</h4>
                    <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
{`// babel.config.js
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@modules': './src/modules',
          '@services': './src/services',
          '@utils': './src/utils',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};`}
                    </pre>
                  </div>
                </div>
              </ConfigSection>

              {/* Internationalization */}
              <ConfigSection
                icon={<Globe className="h-6 w-6" />}
                title="Internationalization"
                description="Multi-language support configuration"
              >
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">i18n Setup</h4>
                    <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
{`// src/translations/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en';
import es from './es';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;`}
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Translation Files</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h5 className="font-medium mb-2">translations/en.ts</h5>
                        <pre className="text-xs bg-background p-3 rounded border">
{`export default {
  common: {
    save: 'Save',
    cancel: 'Cancel',
    loading: 'Loading...',
  },
  modules: {
    home: {
      title: 'Welcome',
      subtitle: 'Get started',
    },
  },
};`}
                        </pre>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h5 className="font-medium mb-2">translations/es.ts</h5>
                        <pre className="text-xs bg-background p-3 rounded border">
{`export default {
  common: {
    save: 'Guardar',
    cancel: 'Cancelar',
    loading: 'Cargando...',
  },
  modules: {
    home: {
      title: 'Bienvenido',
      subtitle: 'Comenzar',
    },
  },
};`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </ConfigSection>

              {/* Security Configuration */}
              <ConfigSection
                icon={<Palette className="h-6 w-6" />}
                title="Security Configuration"
                description="Security settings and best practices"
              >
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Secure Storage</h4>
                    <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
{`// src/services/storage/secureStorage.ts
import EncryptedStorage from 'react-native-encrypted-storage';

export const secureStorage = {
  async setItem(key: string, value: string): Promise<void> {
    try {
      await EncryptedStorage.setItem(key, value);
    } catch (error) {
      console.error('Secure storage setItem error:', error);
    }
  },

  async getItem(key: string): Promise<string | null> {
    try {
      return await EncryptedStorage.getItem(key);
    } catch (error) {
      console.error('Secure storage getItem error:', error);
      return null;
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      await EncryptedStorage.removeItem(key);
    } catch (error) {
      console.error('Secure storage removeItem error:', error);
    }
  },
};`}
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Network Security</h4>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h5 className="font-medium mb-2">Android Network Security Config</h5>
                      <p className="text-sm text-muted-foreground mb-2">Add to android/app/src/main/res/xml/network_security_config.xml:</p>
                      <pre className="text-xs bg-background p-3 rounded border overflow-x-auto">
{`<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <domain-config cleartextTrafficPermitted="false">
        <domain includeSubdomains="true">your-api-domain.com</domain>
    </domain-config>
</network-security-config>`}
                      </pre>
                    </div>
                  </div>
                </div>
              </ConfigSection>
            </div>

            {/* Next Steps */}
            <div className="mt-16 text-center p-8 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border">
              <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                With your configuration set up, you're ready to start developing your app. Learn about the development workflow and best practices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/docs/development" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 transition-colors">
                  Development Guide
                </Link>
                <Link href="/docs/project-structure" className="inline-flex items-center justify-center px-6 py-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors rounded-md">
                  Project Structure
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function ConfigSection({ 
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