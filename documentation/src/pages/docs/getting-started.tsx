import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download, Terminal, Smartphone, CheckCircle } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { SEO } from "@/components/seo"

export default function GettingStarted() {
  return (
    <>
      <SEO 
        title="Getting Started"
        description="Learn how to set up your development environment and create your first React Native app with our professional boilerplate template."
        url="https://sohantalukder.github.io/react-native-boilerplate/docs/getting-started/"
        type="article"
      />

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b">
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

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4">Getting Started</h1>
              <p className="text-xl text-muted-foreground">
                Quick start guide to set up your first React Native project with our boilerplate
              </p>
            </div>

            {/* Prerequisites */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="mr-2 h-6 w-6" />
                  Prerequisites
                </CardTitle>
                <CardDescription>
                  Make sure you have the following tools installed before getting started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <PrerequisiteItem 
                    title="Node.js" 
                    description="Version 18 or higher"
                    link="https://nodejs.org/"
                  />
                  <PrerequisiteItem 
                    title="React Native CLI" 
                    description="Latest version"
                    command="npm install -g @react-native-community/cli"
                  />
                  <PrerequisiteItem 
                    title="iOS Development" 
                    description="Xcode (macOS only)"
                    link="https://developer.apple.com/xcode/"
                  />
                  <PrerequisiteItem 
                    title="Android Development" 
                    description="Android Studio and SDK"
                    link="https://developer.android.com/studio"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Installation */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Terminal className="mr-2 h-6 w-6" />
                  Installation
                </CardTitle>
                <CardDescription>
                  Create a new React Native project using our boilerplate template
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2">1. Create a new project</h4>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                      <div className="text-muted-foreground mb-1"># Using npx (recommended)</div>
                      <div className="text-primary">npx @react-native-community/cli@latest init MyApp --template @sohantalukder/react-native-boilerplate</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">2. Navigate to your project</h4>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                      <div className="text-primary">cd MyApp</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">3. Install dependencies</h4>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                      <div className="text-muted-foreground mb-1"># Using npm</div>
                      <div className="text-primary mb-3">npm install</div>
                      <div className="text-muted-foreground mb-1"># Or using yarn</div>
                      <div className="text-primary">yarn install</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">4. Install iOS dependencies (macOS only)</h4>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                      <div className="text-primary">cd ios && pod install && cd ..</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Running the app */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Smartphone className="mr-2 h-6 w-6" />
                  Running Your App
                </CardTitle>
                <CardDescription>
                  Start the development server and run your app on iOS and Android
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2">Start the Metro bundler</h4>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                      <div className="text-primary">npm start</div>
                      <div className="text-muted-foreground mt-2"># Or with yarn</div>
                      <div className="text-primary">yarn start</div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Run on iOS</h4>
                      <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                        <div className="text-primary">npm run ios</div>
                        <div className="text-muted-foreground mt-2"># Or with yarn</div>
                        <div className="text-primary">yarn ios</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Run on Android</h4>
                      <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                        <div className="text-primary">npm run android</div>
                        <div className="text-muted-foreground mt-2"># Or with yarn</div>
                        <div className="text-primary">yarn android</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What's included */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>What's Included</CardTitle>
                <CardDescription>
                  This boilerplate comes with everything you need to start building your React Native app
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <FeatureItem title="TypeScript Support" description="Type-safe development out of the box" />
                  <FeatureItem title="React Navigation" description="Pre-configured navigation setup" />
                  <FeatureItem title="State Management" description="Zustand for simple state management" />
                  <FeatureItem title="API Integration" description="TanStack Query for data fetching" />
                  <FeatureItem title="Animations" description="React Native Reanimated configured" />
                  <FeatureItem title="Internationalization" description="i18next for multi-language support" />
                  <FeatureItem title="Code Quality" description="ESLint and Prettier configured" />
                  <FeatureItem title="Testing Setup" description="Jest and testing utilities" />
                </div>
              </CardContent>
            </Card>

            {/* Next steps */}
            <div className="text-center p-8 bg-muted rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>
              <p className="text-muted-foreground mb-6">
                Now that you have your project set up, explore these topics to get the most out of the boilerplate:
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

function PrerequisiteItem({ title, description, link, command }: {
  title: string
  description: string
  link?: string
  command?: string
}) {
  return (
    <div className="flex items-start space-x-3">
      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
      <div className="flex-1">
        <div className="font-medium">{title}</div>
        <div className="text-sm text-muted-foreground">{description}</div>
        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
            Download →
          </a>
        )}
        {command && (
          <div className="mt-2 bg-background p-2 rounded border font-mono text-xs">
            {command}
          </div>
        )}
      </div>
    </div>
  )
}

function FeatureItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex items-start space-x-3">
      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-sm text-muted-foreground">{description}</div>
      </div>
    </div>
  )
} 