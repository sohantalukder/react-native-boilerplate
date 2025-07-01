import Link from "next/link"
import { ArrowRight, Github, Smartphone, Zap, Shield, Code, Layers, Palette } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { SEO } from "@/components/seo"

export default function Home() {
  return (
    <>
      <SEO 
        title="React Native Boilerplate - Professional Template"
        description="A production-ready React Native boilerplate with TypeScript, Navigation, State Management, and modern development tools. Build mobile apps faster with best practices."
        url="https://sohantalukder.github.io/react-native-boilerplate/"
      />

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
                  <Smartphone className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">RN Boilerplate</span>
              </div>
              
              <nav className="hidden md:flex items-center space-x-6">
                <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
                  Documentation
                </Link>
                <Link href="/docs/getting-started" className="text-muted-foreground hover:text-foreground transition-colors">
                  Get Started
                </Link>
                <Link href="https://github.com/sohantalukder/react-native-boilerplate" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  GitHub
                </Link>
                <ThemeToggle />
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-8">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  <Zap className="h-4 w-4 mr-2" />
                  Production Ready Template
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                  Build{" "}
                  <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    React Native
                  </span>{" "}
                  Apps Faster
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  A professional, scalable boilerplate with TypeScript, navigation, state management, and modern development tools. Start building your next mobile app in minutes.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link
                  href="/docs/getting-started"
                  className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-primary-foreground bg-primary hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="https://github.com/sohantalukder/react-native-boilerplate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-all duration-200 rounded-lg"
                >
                  <Github className="mr-2 h-5 w-5" />
                  View on GitHub
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">100%</div>
                  <div className="text-sm text-muted-foreground">TypeScript</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">15+</div>
                  <div className="text-sm text-muted-foreground">Libraries</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">0</div>
                  <div className="text-sm text-muted-foreground">Configuration</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">∞</div>
                  <div className="text-sm text-muted-foreground">Possibilities</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Everything You Need
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Pre-configured with industry best practices and modern tools for professional mobile app development
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <FeatureCard
                  icon={<Code className="h-8 w-8" />}
                  title="TypeScript Ready"
                  description="Full TypeScript support with strict configuration, type definitions, and IntelliSense for better development experience"
                />
                <FeatureCard
                  icon={<Layers className="h-8 w-8" />}
                  title="Navigation Setup"
                  description="React Navigation v6 pre-configured with stack, tab, and drawer navigation patterns with TypeScript support"
                />
                <FeatureCard
                  icon={<Zap className="h-8 w-8" />}
                  title="State Management"
                  description="Zustand for lightweight state management and TanStack Query for server state and caching"
                />
                <FeatureCard
                  icon={<Shield className="h-8 w-8" />}
                  title="Security First"
                  description="Built-in secure storage, biometric authentication, and network security configurations"
                />
                <FeatureCard
                  icon={<Palette className="h-8 w-8" />}
                  title="UI Components"
                  description="Beautiful, customizable UI components with dark/light theme support and consistent design system"
                />
                <FeatureCard
                  icon={<Smartphone className="h-8 w-8" />}
                  title="Cross Platform"
                  description="Optimized for both iOS and Android with platform-specific configurations and native modules"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Modern Tech Stack
              </h2>
              <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                Built with the latest and most reliable technologies in the React Native ecosystem
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { name: "React Native", version: "0.80.1" },
                  { name: "React", version: "19.1.0" },
                  { name: "TypeScript", version: "5.0.4" },
                  { name: "React Navigation", version: "7.1.14" },
                  { name: "Zustand", version: "5.0.6" },
                  { name: "TanStack Query", version: "5.81.5" },
                  { name: "React i18next", version: "15.5.3" },
                  { name: "Zod", version: "3.25.67" },
                  { name: "Reanimated", version: "3.18.0" },
                  { name: "Axios", version: "1.10.0" },
                  { name: "Flash List", version: "1.8.3" },
                  { name: "MMKV", version: "3.3.0" }
                ].map((tech) => (
                  <div key={tech.name} className="group p-4 bg-card/50 rounded-lg border hover:shadow-md hover:bg-card/80 transition-all duration-200 cursor-pointer">
                    <div className="font-semibold text-sm group-hover:text-primary transition-colors">{tech.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      v{tech.version}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Ready to Build Your App?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Get started with our comprehensive documentation and build your next React Native application today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/docs/getting-started"
                  className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-primary-foreground bg-primary hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/docs"
                  className="inline-flex items-center justify-center px-8 py-4 border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-all duration-200 rounded-lg"
                >
                  View Documentation
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8">
                <div className="md:col-span-2">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
                      <Smartphone className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <span className="text-xl font-bold">RN Boilerplate</span>
                  </div>
                  <p className="text-muted-foreground mb-4 max-w-md">
                    A professional React Native boilerplate to jumpstart your mobile app development with modern tools and best practices.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Documentation</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><Link href="/docs/getting-started" className="hover:text-foreground transition-colors">Getting Started</Link></li>
                    <li><Link href="/docs/project-structure" className="hover:text-foreground transition-colors">Project Structure</Link></li>
                    <li><Link href="/docs/configuration" className="hover:text-foreground transition-colors">Configuration</Link></li>
                    <li><Link href="/docs/development" className="hover:text-foreground transition-colors">Development</Link></li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Links</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><Link href="https://github.com/sohantalukder/react-native-boilerplate" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub</Link></li>
                    <li><Link href="https://reactnative.dev" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">React Native</Link></li>
                    <li><Link href="https://expo.dev" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Expo</Link></li>
                  </ul>
                </div>
              </div>

              <div className="border-t pt-8 mt-8 text-center text-sm text-muted-foreground">
                <p>&copy; 2024 React Native Boilerplate. Built with ❤️ for the React Native community.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

function FeatureCard({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <Card className="border-0 shadow-sm bg-card/50 hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <div className="mb-3 p-3 bg-primary/10 text-primary rounded-lg w-fit">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription className="text-base leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  )
} 