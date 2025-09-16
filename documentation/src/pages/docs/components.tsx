import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Code2, 
  Palette, 
  Layout, 
  Zap, 
  Shield, 
  Smartphone,
  CheckCircle,
  Star,
  ArrowRight,
  Download,
  Eye,
  Settings
} from 'lucide-react';

interface Component {
  name: string;
  description: string;
  category: 'atoms' | 'molecules' | 'organisms' | 'templates';
  status: 'stable' | 'beta' | 'deprecated';
  features: string[];
}

const components: Component[] = [
  // Atoms
  {
    name: 'Button',
    description: 'Interactive button with multiple variants and loading states',
    category: 'atoms',
    status: 'stable',
    features: ['Multiple variants', 'Loading states', 'Icon support', 'Ripple effect']
  },
  {
    name: 'Text',
    description: 'Typography component with theme integration',
    category: 'atoms',
    status: 'stable',
    features: ['Typography variants', 'Theme colors', 'Responsive sizing', 'Accessibility']
  },
  {
    name: 'Card',
    description: 'Container component with elevation and variants',
    category: 'atoms',
    status: 'stable',
    features: ['Multiple variants', 'Elevation levels', 'Pressable support', 'Customizable']
  },
  {
    name: 'TextInput',
    description: 'Form input with validation and animation support',
    category: 'atoms',
    status: 'stable',
    features: ['Validation', 'Animations', 'Icons', 'Error states']
  },
  {
    name: 'Image',
    description: 'Optimized image component with caching',
    category: 'atoms',
    status: 'stable',
    features: ['Fast loading', 'Caching', 'Placeholder', 'Error handling']
  },
  {
    name: 'Badge',
    description: 'Status indicator component',
    category: 'atoms',
    status: 'stable',
    features: ['Status variants', 'Customizable', 'Accessible', 'Responsive']
  },
  {
    name: 'Checkbox',
    description: 'Selection input component',
    category: 'atoms',
    status: 'stable',
    features: ['Multiple states', 'Customizable', 'Accessible', 'Theme support']
  },
  {
    name: 'Switch',
    description: 'Toggle switch component',
    category: 'atoms',
    status: 'stable',
    features: ['Smooth animation', 'Customizable', 'Accessible', 'Theme support']
  },
  {
    name: 'Loader',
    description: 'Loading indicator component',
    category: 'atoms',
    status: 'stable',
    features: ['Multiple variants', 'Customizable', 'Smooth animation', 'Theme support']
  },
  {
    name: 'Skeleton',
    description: 'Content placeholder component',
    category: 'atoms',
    status: 'stable',
    features: ['Content placeholders', 'Customizable', 'Smooth animation', 'Responsive']
  },
  // Molecules
  {
    name: 'Avatar',
    description: 'User profile image with fallback',
    category: 'molecules',
    status: 'stable',
    features: ['Image fallback', 'Customizable', 'Responsive', 'Accessible']
  },
  {
    name: 'PasswordInput',
    description: 'Secure text input with toggle',
    category: 'molecules',
    status: 'stable',
    features: ['Password toggle', 'Validation', 'Security', 'Accessible']
  },
  {
    name: 'PhotoCarousel',
    description: 'Image gallery component',
    category: 'molecules',
    status: 'stable',
    features: ['Image gallery', 'Swipe gestures', 'Indicators', 'Responsive']
  },
  {
    name: 'EmptyContent',
    description: 'Empty state component',
    category: 'molecules',
    status: 'stable',
    features: ['Empty states', 'Customizable', 'Action buttons', 'Illustrations']
  },
  {
    name: 'TopTabBar',
    description: 'Tab navigation component',
    category: 'molecules',
    status: 'stable',
    features: ['Tab navigation', 'Smooth animation', 'Customizable', 'Accessible']
  },
  // Organisms
  {
    name: 'ErrorBoundary',
    description: 'Error handling wrapper',
    category: 'organisms',
    status: 'stable',
    features: ['Error handling', 'Fallback UI', 'Error reporting', 'Recovery']
  },
  {
    name: 'SlideModal',
    description: 'Animated modal component',
    category: 'organisms',
    status: 'stable',
    features: ['Smooth animation', 'Backdrop', 'Customizable', 'Accessible']
  },
  {
    name: 'WebView',
    description: 'Web content component',
    category: 'organisms',
    status: 'stable',
    features: ['Web content', 'Loading states', 'Error handling', 'Customizable']
  },
  // Templates
  {
    name: 'SafeScreen',
    description: 'Safe area screen wrapper',
    category: 'templates',
    status: 'stable',
    features: ['Safe areas', 'Status bar', 'Keyboard handling', 'Responsive']
  },
  {
    name: 'ScreenContainer',
    description: 'Standard screen container',
    category: 'templates',
    status: 'stable',
    features: ['Standard layout', 'Padding', 'Background', 'Responsive']
  }
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'atoms': return <Zap className="w-4 h-4" />;
    case 'molecules': return <Layout className="w-4 h-4" />;
    case 'organisms': return <Settings className="w-4 h-4" />;
    case 'templates': return <Smartphone className="w-4 h-4" />;
    default: return <Code2 className="w-4 h-4" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'stable': return 'bg-green-100 text-green-800';
    case 'beta': return 'bg-yellow-100 text-yellow-800';
    case 'deprecated': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const ComponentCard: React.FC<{ component: Component }> = ({ component }) => (
  <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center space-x-2">
        {getCategoryIcon(component.category)}
        <h3 className="text-lg font-semibold text-gray-900">{component.name}</h3>
      </div>
      <Badge className={getStatusColor(component.status)}>
        {component.status}
      </Badge>
    </div>
    
    <p className="text-gray-600 mb-4">{component.description}</p>
    
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-gray-700">Features:</h4>
      <div className="flex flex-wrap gap-2">
        {component.features.map((feature, index) => (
          <span
            key={index}
            className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
          >
            <CheckCircle className="w-3 h-3 mr-1" />
            {feature}
          </span>
        ))}
      </div>
    </div>
    
    <div className="mt-4 pt-4 border-t border-gray-200">
      <Button variant="outline" size="sm" className="w-full">
        <Eye className="w-4 h-4 mr-2" />
        View Documentation
      </Button>
    </div>
  </Card>
);

const ComponentsPage: React.FC = () => {
  const atoms = components.filter(c => c.category === 'atoms');
  const molecules = components.filter(c => c.category === 'molecules');
  const organisms = components.filter(c => c.category === 'organisms');
  const templates = components.filter(c => c.category === 'templates');

  return (
    <>
      <Head>
        <title>Component Library - React Native Boilerplate</title>
        <meta name="description" content="Comprehensive component library with 20+ pre-built, accessible UI components for React Native applications." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Hero Section */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Code2 className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Component Library
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                A comprehensive collection of 20+ pre-built, accessible UI components 
                following atomic design principles. Built with TypeScript, theme integration, 
                and accessibility in mind.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Download className="w-5 h-5 mr-2" />
                  Get Started
                </Button>
                <Button variant="outline" size="lg">
                  <Eye className="w-5 h-5 mr-2" />
                  View Examples
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose Our Component Library?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Built with modern React Native best practices and designed for scale
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="p-3 bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Accessible</h3>
                <p className="text-gray-600">WCAG 2.1 AA compliant with full accessibility support</p>
              </div>
              
              <div className="text-center">
                <div className="p-3 bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Palette className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Themed</h3>
                <p className="text-gray-600">Full theme integration with light/dark mode support</p>
              </div>
              
              <div className="text-center">
                <div className="p-3 bg-purple-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Performant</h3>
                <p className="text-gray-600">Optimized for React Native with smooth animations</p>
              </div>
              
              <div className="text-center">
                <div className="p-3 bg-orange-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Smartphone className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Responsive</h3>
                <p className="text-gray-600">Adapts to all screen sizes and orientations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Components Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Component Categories
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Organized following atomic design principles for better maintainability and scalability
              </p>
            </div>

            <Tabs defaultValue="atoms" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="atoms" className="flex items-center space-x-2">
                  <Zap className="w-4 h-4" />
                  <span>Atoms ({atoms.length})</span>
                </TabsTrigger>
                <TabsTrigger value="molecules" className="flex items-center space-x-2">
                  <Layout className="w-4 h-4" />
                  <span>Molecules ({molecules.length})</span>
                </TabsTrigger>
                <TabsTrigger value="organisms" className="flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span>Organisms ({organisms.length})</span>
                </TabsTrigger>
                <TabsTrigger value="templates" className="flex items-center space-x-2">
                  <Smartphone className="w-4 h-4" />
                  <span>Templates ({templates.length})</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="atoms">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {atoms.map((component, index) => (
                    <ComponentCard key={index} component={component} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="molecules">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {molecules.map((component, index) => (
                    <ComponentCard key={index} component={component} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="organisms">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {organisms.map((component, index) => (
                    <ComponentCard key={index} component={component} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="templates">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {templates.map((component, index) => (
                    <ComponentCard key={index} component={component} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Build Amazing Apps?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Start building with our comprehensive component library and create 
              beautiful, accessible React Native applications in minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                <Download className="w-5 h-5 mr-2" />
                Get Started Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Star className="w-5 h-5 mr-2" />
                View on GitHub
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export default ComponentsPage;
