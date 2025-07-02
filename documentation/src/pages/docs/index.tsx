import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Book, Rocket, Settings, Code, ArrowRight, Github, Palette, Layers, Target, Globe } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { SEO } from "@/components/seo"

export default function DocsIndex() {
  return (
    <>
      <SEO 
        title="Documentation"
        description="Comprehensive documentation for React Native Boilerplate. Learn how to build professional mobile apps with TypeScript, Navigation, and State Management."
        url="https://sohantalukder.github.io/react-native-boilerplate/docs/"
      />

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-muted-foreground hover:text-foreground inline-flex items-center transition-colors">
                ← Back to Home
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="mb-12 text-center">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Book className="h-4 w-4 mr-2" />
                Documentation Hub
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Documentation
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Everything you need to know about building React Native applications with our boilerplate. 
                From initial setup to advanced configurations and best practices.
              </p>
            </div>

            {/* Main Documentation Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <DocCard
                href="/docs/getting-started"
                icon={<Rocket className="h-8 w-8" />}
                title="Getting Started"
                description="Set up your development environment and create your first React Native app with our boilerplate"
                estimatedTime="10 min read"
                badge="Start Here"
                badgeColor="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              />

              <DocCard
                href="/docs/project-structure"
                icon={<Code className="h-8 w-8" />}
                title="Project Structure"
                description="Understand the folder organization, file naming conventions, and architectural patterns"
                estimatedTime="8 min read"
              />

              <DocCard
                href="/docs/configuration"
                icon={<Settings className="h-8 w-8" />}
                title="Configuration"
                description="Configure environment variables, build settings, internationalization, and security"
                estimatedTime="15 min read"
              />

              <DocCard
                href="/docs/architecture"
                icon={<Layers className="h-8 w-8" />}
                title="Architecture Guide"
                description="Learn about modular architecture, atomic design principles, and structural patterns"
                estimatedTime="12 min read"
              />

              <DocCard
                href="/docs/theming"
                icon={<Palette className="h-8 w-8" />}
                title="Theming System"
                description="Customize colors, typography, implement dark/light mode, and create consistent styling"
                estimatedTime="10 min read"
              />

              <DocCard
                href="/docs/api"
                icon={<Globe className="h-8 w-8" />}
                title="API Integration"
                description="API setup, authentication, data fetching with TanStack Query, and error handling"
                estimatedTime="18 min read"
              />

              <DocCard
                href="/docs/best-practices"
                icon={<Target className="h-8 w-8" />}
                title="Best Practices"
                description="Development guidelines, coding standards, performance optimization, and testing strategies"
                estimatedTime="20 min read"
              />

              <DocCard
                href="/docs/development"
                icon={<Code className="h-8 w-8" />}
                title="Development Guide"
                description="Learn the development workflow, debugging techniques, testing strategies, and performance optimization"
                estimatedTime="20 min read"
              />
            </div>

            {/* Quick Links Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Quick References</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <QuickLinkCard
                  title="Commands"
                  description="Essential CLI commands for development"
                  links={[
                    { label: "Start Metro", command: "npm start" },
                    { label: "Run iOS", command: "npm run ios" },
                    { label: "Run Android", command: "npm run android" },
                    { label: "Type Check", command: "npm run type-check" }
                  ]}
                />

                <QuickLinkCard
                  title="Key Technologies"
                  description="Core libraries and frameworks"
                  links={[
                    { label: "React Navigation", url: "https://reactnavigation.org" },
                    { label: "Zustand", url: "https://zustand-demo.pmnd.rs" },
                    { label: "TanStack Query", url: "https://tanstack.com/query" },
                    { label: "React Hook Form", url: "https://react-hook-form.com" }
                  ]}
                />

                <QuickLinkCard
                  title="File Structure"
                  description="Key directories and files"
                  links={[
                    { label: "src/components/", description: "Reusable UI components" },
                    { label: "src/modules/", description: "Feature modules" },
                    { label: "src/services/", description: "API and external services" },
                    { label: "src/store/", description: "Global state management" }
                  ]}
                />
              </div>
            </div>

            {/* Features Overview */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">What's Included</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <FeatureOverview key={index} {...feature} />
                ))}
              </div>
            </div>

            {/* Get Help Section */}
            <div className="text-center p-8 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border">
              <h2 className="text-2xl font-semibold mb-4">Need Help?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Can't find what you're looking for? Check out our community resources or contribute to the documentation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="https://github.com/sohantalukder/react-native-boilerplate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
                >
                  <Code className="mr-2 h-5 w-5" />
                  View on GitHub
                </Link>
                <Link
                  href="/docs/getting-started"
                  className="inline-flex items-center justify-center px-6 py-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors rounded-md"
                >
                  Start Building
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function DocCard({
  href,
  icon,
  title,
  description,
  estimatedTime,
  badge,
  badgeColor = "bg-primary/10 text-primary"
}: {
  href: string
  icon: React.ReactNode
  title: string
  description: string
  estimatedTime: string
  badge?: string
  badgeColor?: string
}) {
  return (
    <Link href={href} className="group block">
      <Card className="border-0 shadow-sm bg-card/50 hover:shadow-md transition-all duration-200 group-hover:bg-card/80">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between mb-3">
            <div className="p-3 bg-primary/10 text-primary rounded-lg group-hover:bg-primary/20 transition-colors">
              {icon}
            </div>
            {badge && (
              <span className={`px-2 py-1 text-xs font-medium rounded ${badgeColor}`}>
                {badge}
              </span>
            )}
          </div>
          <CardTitle className="text-xl group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <CardDescription className="text-base leading-relaxed mb-3">
            {description}
          </CardDescription>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{estimatedTime}</span>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

function QuickLinkCard({
  title,
  description,
  links
}: {
  title: string
  description: string
  links: Array<{
    label: string
    command?: string
    url?: string
    description?: string
  }>
}) {
  return (
    <Card className="border-0 shadow-sm bg-card/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <ul className="space-y-2">
          {links.map((link, index) => (
            <li key={index} className="flex items-center justify-between text-sm">
              <span className="font-medium">{link.label}</span>
              {link.command && (
                <code className="px-2 py-1 bg-muted rounded text-xs font-mono">
                  {link.command}
                </code>
              )}
              {link.url && (
                <a 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary hover:underline"
                >
                  →
                </a>
              )}
              {link.description && (
                <span className="text-muted-foreground text-xs">
                  {link.description}
                </span>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

function FeatureOverview({
  title,
  description,
  status
}: {
  title: string
  description: string
  status: 'included' | 'optional' | 'coming-soon'
}) {
  const statusConfig = {
    included: { color: "bg-green-100 text-green-800", label: "Included" },
    optional: { color: "bg-blue-100 text-blue-800", label: "Optional" },
    'coming-soon': { color: "bg-orange-100 text-orange-800", label: "Coming Soon" }
  }

  return (
    <div className="p-4 bg-card/30 rounded-lg border">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-sm">{title}</h3>
        <span className={`px-2 py-1 text-xs font-medium rounded ${statusConfig[status].color}`}>
          {statusConfig[status].label}
        </span>
      </div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  )
}

const features = [
  {
    title: "TypeScript Setup",
    description: "Strict TypeScript configuration with path mapping",
    status: "included" as const
  },
  {
    title: "Navigation",
    description: "React Navigation v6 with type-safe routing",
    status: "included" as const
  },
  {
    title: "State Management",
    description: "Zustand for global state and TanStack Query for server state",
    status: "included" as const
  },
  {
    title: "UI Components",
    description: "Pre-built components with dark/light theme support",
    status: "included" as const
  },
  {
    title: "API Integration",
    description: "Axios setup with interceptors and error handling",
    status: "included" as const
  },
  {
    title: "Testing Setup",
    description: "Jest and React Native Testing Library configuration",
    status: "included" as const
  },
  {
    title: "Internationalization",
    description: "i18next setup for multi-language support",
    status: "included" as const
  },
  {
    title: "Security",
    description: "Secure storage and biometric authentication",
    status: "included" as const
  },
  {
    title: "Analytics",
    description: "Firebase Analytics and Crashlytics integration",
    status: "optional" as const
  }
] 