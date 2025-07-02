import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Layers, Folder, FileText, Settings, Database, Code2, Package } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { SEO } from "@/components/seo"

export default function Architecture() {
  return (
    <>
      <SEO 
        title="Architecture Guide"
        description="Learn about the modular architecture, atomic design principles, and structural patterns used in the React Native boilerplate."
        url="https://sohantalukder.github.io/react-native-boilerplate/docs/architecture/"
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
              <h1 className="text-4xl font-bold mb-4">Architecture Guide</h1>
              <p className="text-xl text-muted-foreground">
                Understanding the modular architecture and design patterns used in this React Native boilerplate
              </p>
            </div>

            {/* Architecture Overview */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Layers className="mr-2 h-6 w-6" />
                  Architecture Overview
                </CardTitle>
                <CardDescription>
                  This boilerplate follows a modular, scalable architecture designed for maintainability and team collaboration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ArchitectureItem 
                    title="Modular Structure" 
                    description="Features are organized into self-contained modules with clear boundaries"
                  />
                  <ArchitectureItem 
                    title="Atomic Design" 
                    description="UI components follow atomic design principles for consistency and reusability"
                  />
                  <ArchitectureItem 
                    title="Clean Architecture" 
                    description="Separation of concerns with clear data flow and dependency management"
                  />
                  <ArchitectureItem 
                    title="TypeScript First" 
                    description="Strong typing throughout the application for better developer experience"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Folder Structure */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Folder className="mr-2 h-6 w-6" />
                  Folder Structure
                </CardTitle>
                <CardDescription>
                  How the codebase is organized for maximum efficiency and clarity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
                  <div className="text-primary">src/</div>
                  <div className="ml-2 text-muted-foreground">├── components/     # Reusable UI components</div>
                  <div className="ml-2 text-muted-foreground">├── modules/        # Feature-specific modules</div>
                  <div className="ml-2 text-muted-foreground">├── services/       # API and external services</div>
                  <div className="ml-2 text-muted-foreground">├── store/          # Global state management</div>
                  <div className="ml-2 text-muted-foreground">├── navigation/     # Navigation configuration</div>
                  <div className="ml-2 text-muted-foreground">├── hooks/          # Custom React hooks</div>
                  <div className="ml-2 text-muted-foreground">├── utils/          # Utility functions</div>
                  <div className="ml-2 text-muted-foreground">├── types/          # TypeScript type definitions</div>
                  <div className="ml-2 text-muted-foreground">└── constants/      # Application constants</div>
                </div>
              </CardContent>
            </Card>

            {/* Component Architecture */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code2 className="mr-2 h-6 w-6" />
                  Component Architecture
                </CardTitle>
                <CardDescription>
                  How components are structured following atomic design principles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2">Atoms</h4>
                    <p className="text-muted-foreground mb-2">Basic building blocks - buttons, inputs, icons</p>
                    <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                      <div className="text-primary">components/atoms/Button/</div>
                      <div className="ml-2 text-muted-foreground">├── Button.tsx</div>
                      <div className="ml-2 text-muted-foreground">├── Button.types.ts</div>
                      <div className="ml-2 text-muted-foreground">└── index.ts</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Molecules</h4>
                    <p className="text-muted-foreground mb-2">Simple combinations of atoms - form fields, cards</p>
                    <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                      <div className="text-primary">components/molecules/FormField/</div>
                      <div className="ml-2 text-muted-foreground">├── FormField.tsx</div>
                      <div className="ml-2 text-muted-foreground">├── FormField.styles.ts</div>
                      <div className="ml-2 text-muted-foreground">└── index.ts</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Organisms</h4>
                    <p className="text-muted-foreground mb-2">Complex UI sections - headers, forms, lists</p>
                    <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                      <div className="text-primary">components/organisms/UserProfile/</div>
                      <div className="ml-2 text-muted-foreground">├── UserProfile.tsx</div>
                      <div className="ml-2 text-muted-foreground">├── UserProfile.hooks.ts</div>
                      <div className="ml-2 text-muted-foreground">└── index.ts</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* State Management */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="mr-2 h-6 w-6" />
                  State Management
                </CardTitle>
                <CardDescription>
                  How global and local state is managed throughout the application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <StateItem 
                    title="Zustand for Global State" 
                    description="Simple, lightweight state management for app-wide data"
                  />
                  <StateItem 
                    title="TanStack Query for Server State" 
                    description="Powerful data fetching and caching for API interactions"
                  />
                  <StateItem 
                    title="React Hook Form for Form State" 
                    description="Efficient form handling with validation and performance optimization"
                  />
                  <StateItem 
                    title="Local Component State" 
                    description="useState and useReducer for component-specific state"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Module Structure */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="mr-2 h-6 w-6" />
                  Module Structure
                </CardTitle>
                <CardDescription>
                  How features are organized into self-contained modules
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
                  <div className="text-primary">modules/auth/</div>
                  <div className="ml-2 text-muted-foreground">├── components/     # Module-specific components</div>
                  <div className="ml-2 text-muted-foreground">├── hooks/          # Module-specific hooks</div>
                  <div className="ml-2 text-muted-foreground">├── services/       # API services for this module</div>
                  <div className="ml-2 text-muted-foreground">├── store/          # Module state management</div>
                  <div className="ml-2 text-muted-foreground">├── types/          # Module type definitions</div>
                  <div className="ml-2 text-muted-foreground">├── utils/          # Module utilities</div>
                  <div className="ml-2 text-muted-foreground">└── index.ts        # Module exports</div>
                </div>
                <p className="text-muted-foreground">
                  Each module is self-contained and can be easily moved or removed without affecting other parts of the application.
                </p>
              </CardContent>
            </Card>

            {/* Best Practices */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="mr-2 h-6 w-6" />
                  Architectural Best Practices
                </CardTitle>
                <CardDescription>
                  Guidelines to maintain clean and scalable architecture
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <BestPracticeItem 
                    title="Single Responsibility" 
                    description="Each component and module should have a single, well-defined purpose"
                  />
                  <BestPracticeItem 
                    title="Dependency Injection" 
                    description="Use props and context to inject dependencies rather than direct imports"
                  />
                  <BestPracticeItem 
                    title="Interface Segregation" 
                    description="Create specific interfaces rather than large, monolithic ones"
                  />
                  <BestPracticeItem 
                    title="Consistent Naming" 
                    description="Follow established naming conventions throughout the codebase"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <div className="text-center p-8 bg-muted rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>
              <p className="text-muted-foreground mb-6">
                Now that you understand the architecture, explore these related topics:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/docs/project-structure" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 transition-colors">
                  Project Structure
                </Link>
                <Link href="/docs/best-practices" className="inline-flex items-center justify-center px-6 py-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors rounded-md">
                  Best Practices
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function ArchitectureItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex items-start space-x-3">
      <div className="w-2 h-2 rounded-full bg-primary mt-2.5 flex-shrink-0"></div>
      <div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

function StateItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex items-start space-x-3">
      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2.5 flex-shrink-0"></div>
      <div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

function BestPracticeItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex items-start space-x-3">
      <div className="w-2 h-2 rounded-full bg-green-500 mt-2.5 flex-shrink-0"></div>
      <div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  )
} 