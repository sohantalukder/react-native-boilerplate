import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Folder, FileText, Code } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { SEO } from "@/components/seo"

export default function ProjectStructure() {
  return (
    <>
      <SEO 
        title="Project Structure"
        description="Understand the folder organization, file naming conventions, and architectural patterns of the React Native Boilerplate."
        url="https://sohantalukder.github.io/react-native-boilerplate/docs/project-structure/"
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
              <h1 className="text-4xl font-bold mb-4">Project Structure</h1>
              <p className="text-xl text-muted-foreground">
                Learn about the folder structure and organization of the React Native boilerplate
              </p>
            </div>

            {/* Overview */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>
                  The boilerplate follows a modular and scalable folder structure based on feature organization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                  <div className="space-y-1">
                    <div>📁 src/</div>
                    <div className="ml-4">📁 components/</div>
                    <div className="ml-4">📁 modules/</div>
                    <div className="ml-4">📁 navigation/</div>
                    <div className="ml-4">📁 services/</div>
                    <div className="ml-4">📁 store/</div>
                    <div className="ml-4">📁 utils/</div>
                    <div className="ml-4">📁 hooks/</div>
                    <div className="ml-4">📁 types/</div>
                    <div className="ml-4">📁 assets/</div>
                    <div className="ml-4">📁 translations/</div>
                    <div>📁 android/</div>
                    <div>📁 ios/</div>
                    <div>📄 package.json</div>
                    <div>📄 App.tsx</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Folder Details */}
            <div className="space-y-6">
              <FolderCard
                title="src/"
                description="Main source code directory"
                icon={<Folder className="h-5 w-5" />}
                items={[
                  "Contains all TypeScript/JavaScript source code",
                  "Organized by feature and functionality",
                  "Follows separation of concerns principle"
                ]}
              />

              <FolderCard
                title="src/components/"
                description="Reusable UI components"
                icon={<Code className="h-5 w-5" />}
                items={[
                  "Shared components used across multiple modules",
                  "Atomic design methodology",
                  "Each component has its own folder with index.ts",
                  "Includes unit tests and Storybook stories"
                ]}
                example={`components/
├── Button/
│   ├── index.ts
│   ├── Button.tsx
│   ├── Button.test.tsx
│   └── Button.stories.tsx
└── Input/
    ├── index.ts
    └── Input.tsx`}
              />

              <FolderCard
                title="src/modules/"
                description="Feature modules and screen components"
                icon={<FileText className="h-5 w-5" />}
                items={[
                  "Each module has its own folder",
                  "Module-specific components in components/ subfolder",
                  "Hooks and utilities specific to the module",
                  "Tests for module functionality"
                ]}
                example={`modules/
├── Home/
│   ├── index.ts
│   ├── HomeScreen.tsx
│   ├── components/
│   │   └── HeaderSection/
│   └── hooks/
│       └── useHomeData.ts
└── Profile/
    ├── index.ts
    └── ProfileScreen.tsx`}
              />
            </div>

            {/* Next steps */}
            <div className="text-center p-8 bg-muted rounded-lg mt-8">
              <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>
              <p className="text-muted-foreground mb-6">
                Now that you understand the project structure, learn how to configure your app:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/docs/configuration" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 transition-colors">
                  Configuration Guide
                </Link>
                <Link href="/docs/development" className="inline-flex items-center justify-center px-6 py-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors rounded-md">
                  Development Guide
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function FolderCard({ title, description, icon, items, example }: {
  title: string
  description: string
  icon: React.ReactNode
  items: string[]
  example?: string
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          {icon}
          <span className="ml-2">{title}</span>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 mb-4">
          {items.map((item, index) => (
            <li key={index} className="flex items-start">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
              <span className="text-sm">{item}</span>
            </li>
          ))}
        </ul>
        {example && (
          <div className="mt-4">
            <h5 className="font-semibold mb-2">Example Structure:</h5>
            <div className="bg-muted p-3 rounded font-mono text-xs whitespace-pre">
              {example}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 