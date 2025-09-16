import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Palette, 
  Type, 
  Eye, 
  Smartphone,
  CheckCircle,
  Star,
  Download,
  Moon,
  Sun,
  Contrast,
  Accessibility,
  Ruler,
  Grid3X3
} from 'lucide-react';

interface ColorPalette {
  name: string;
  value: string;
  description: string;
  usage: string;
}

interface TypographyScale {
  name: string;
  size: number;
  weight: string;
  lineHeight: number;
  usage: string;
}

const colorPalettes: ColorPalette[] = [
  // Primary Colors
  { name: 'Primary', value: '#4E4DD7', description: 'Main brand color', usage: 'Primary actions, links, brand elements' },
  { name: 'Secondary', value: '#00CCCC', description: 'Secondary brand color', usage: 'Secondary actions, accents' },
  
  // Semantic Colors
  { name: 'Success', value: '#22C55E', description: 'Success states', usage: 'Success messages, positive states' },
  { name: 'Warning', value: '#FFAB00', description: 'Warning states', usage: 'Warnings, caution states' },
  { name: 'Error', value: '#FF5630', description: 'Error states', usage: 'Errors, destructive actions' },
  { name: 'Info', value: '#00B8D9', description: 'Information states', usage: 'Information, neutral states' },
  
  // Neutral Colors
  { name: 'Background', value: '#FAFAFB', description: 'Main background', usage: 'App background, card backgrounds' },
  { name: 'Text', value: '#1B1D20', description: 'Primary text', usage: 'Main text content' },
  { name: 'Gray 1', value: '#323436', description: 'Secondary text', usage: 'Secondary text, labels' },
  { name: 'Gray 5', value: '#98999B', description: 'Border color', usage: 'Borders, dividers' },
  { name: 'Gray 9', value: '#F4F4F4', description: 'Light background', usage: 'Card backgrounds, sections' },
];

const typographyScale: TypographyScale[] = [
  { name: 'Heading 1', size: 32, weight: 'Bold', lineHeight: 38.4, usage: 'Main page titles, hero sections' },
  { name: 'Heading 2', size: 24, weight: 'Bold', lineHeight: 28.8, usage: 'Section titles, card headers' },
  { name: 'Heading 3', size: 18, weight: 'Bold', lineHeight: 21.6, usage: 'Subsection titles, component headers' },
  { name: 'Body 1', size: 16, weight: 'Regular', lineHeight: 19.2, usage: 'Primary content, paragraphs' },
  { name: 'Body 2', size: 14, weight: 'Regular', lineHeight: 16.8, usage: 'Secondary content, captions' },
  { name: 'Body 3', size: 12, weight: 'Regular', lineHeight: 14.4, usage: 'Small text, labels, metadata' },
];

const spacingScale = [0, 2, 3, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 32, 40, 48, 80];

const ColorCard: React.FC<{ color: ColorPalette }> = ({ color }) => (
  <Card className="p-4 hover:shadow-md transition-shadow duration-200">
    <div className="flex items-center space-x-4 mb-3">
      <div 
        className="w-12 h-12 rounded-lg border border-gray-200 shadow-sm"
        style={{ backgroundColor: color.value }}
      />
      <div>
        <h3 className="font-semibold text-gray-900">{color.name}</h3>
        <p className="text-sm text-gray-600">{color.value}</p>
      </div>
    </div>
    <p className="text-sm text-gray-700 mb-2">{color.description}</p>
    <p className="text-xs text-gray-500">{color.usage}</p>
  </Card>
);

const TypographyCard: React.FC<{ typography: TypographyScale }> = ({ typography }) => (
  <Card className="p-6 hover:shadow-md transition-shadow duration-200">
    <div className="mb-4">
      <h3 className="font-semibold text-gray-900 mb-2">{typography.name}</h3>
      <div className="text-sm text-gray-600 space-y-1">
        <p><span className="font-medium">Size:</span> {typography.size}px</p>
        <p><span className="font-medium">Weight:</span> {typography.weight}</p>
        <p><span className="font-medium">Line Height:</span> {typography.lineHeight}px</p>
      </div>
    </div>
    
    <div 
      className="mb-4"
      style={{
        fontSize: `${typography.size}px`,
        fontWeight: typography.weight.toLowerCase(),
        lineHeight: `${typography.lineHeight}px`,
      }}
    >
      The quick brown fox jumps over the lazy dog
    </div>
    
    <p className="text-xs text-gray-500">{typography.usage}</p>
  </Card>
);

const SpacingCard: React.FC<{ value: number }> = ({ value }) => (
  <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
    <div className="text-sm font-mono text-gray-600 w-8">{value}px</div>
    <div 
      className="bg-blue-500 rounded"
      style={{ 
        width: value === 0 ? 2 : value, 
        height: value === 0 ? 2 : value 
      }}
    />
  </div>
);

const StyleGuidePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Style Guide - React Native Boilerplate</title>
        <meta name="description" content="Comprehensive design system and style guide for React Native applications with colors, typography, spacing, and accessibility guidelines." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
        {/* Hero Section */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-3 bg-purple-100 rounded-full">
                  <Palette className="w-8 h-8 text-purple-600" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Style Guide
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                A comprehensive design system built for React Native applications. 
                Featuring consistent colors, typography, spacing, and accessibility 
                guidelines that scale across all devices and platforms.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  <Download className="w-5 h-5 mr-2" />
                  Download Assets
                </Button>
                <Button variant="outline" size="lg">
                  <Eye className="w-5 h-5 mr-2" />
                  View Examples
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Design Principles */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Design Principles
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our design system is built on modern principles that prioritize 
                consistency, accessibility, and scalability
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="p-3 bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Eye className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Clarity First</h3>
                <p className="text-gray-600">Every element has a clear purpose and meaning</p>
              </div>
              
              <div className="text-center">
                <div className="p-3 bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Grid3X3 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Consistency</h3>
                <p className="text-gray-600">Unified patterns and styling throughout</p>
              </div>
              
              <div className="text-center">
                <div className="p-3 bg-purple-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Accessibility className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Accessibility</h3>
                <p className="text-gray-600">WCAG 2.1 AA compliant design</p>
              </div>
              
              <div className="text-center">
                <div className="p-3 bg-orange-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Smartphone className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Responsive</h3>
                <p className="text-gray-600">Adapts to all screen sizes and devices</p>
              </div>
            </div>
          </div>
        </div>

        {/* Style Guide Sections */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Design System Components
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore our comprehensive design system with colors, typography, 
                spacing, and accessibility guidelines
              </p>
            </div>

            <Tabs defaultValue="colors" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="colors" className="flex items-center space-x-2">
                  <Palette className="w-4 h-4" />
                  <span>Colors</span>
                </TabsTrigger>
                <TabsTrigger value="typography" className="flex items-center space-x-2">
                  <Type className="w-4 h-4" />
                  <span>Typography</span>
                </TabsTrigger>
                <TabsTrigger value="spacing" className="flex items-center space-x-2">
                  <Ruler className="w-4 h-4" />
                  <span>Spacing</span>
                </TabsTrigger>
                <TabsTrigger value="accessibility" className="flex items-center space-x-2">
                  <Accessibility className="w-4 h-4" />
                  <span>Accessibility</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="colors">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Color Palette</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {colorPalettes.map((color, index) => (
                        <ColorCard key={index} color={color} />
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-8 rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Dark Mode Support</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-center space-x-4">
                        <Sun className="w-6 h-6 text-yellow-500" />
                        <div>
                          <h5 className="font-medium text-gray-900">Light Mode</h5>
                          <p className="text-sm text-gray-600">Optimized for bright environments</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Moon className="w-6 h-6 text-blue-500" />
                        <div>
                          <h5 className="font-medium text-gray-900">Dark Mode</h5>
                          <p className="text-sm text-gray-600">Easy on the eyes in low light</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="typography">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Typography Scale</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {typographyScale.map((typography, index) => (
                        <TypographyCard key={index} typography={typography} />
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-8 rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Font Weights</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-normal mb-2">Regular</div>
                        <div className="text-sm text-gray-600">400</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-medium mb-2">Medium</div>
                        <div className="text-sm text-gray-600">500</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-semibold mb-2">Semi Bold</div>
                        <div className="text-sm text-gray-600">600</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold mb-2">Bold</div>
                        <div className="text-sm text-gray-600">700</div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="spacing">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Spacing Scale</h3>
                    <p className="text-gray-600 mb-6">
                      Our spacing system uses a consistent 8px base unit for all measurements, 
                      ensuring visual harmony and consistency across the application.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {spacingScale.map((value, index) => (
                        <SpacingCard key={index} value={value} />
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-8 rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Usage Guidelines</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Screen Padding</h5>
                        <p className="text-sm text-gray-600">16px on mobile, 24px on tablet</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Section Spacing</h5>
                        <p className="text-sm text-gray-600">24px between major sections</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Component Spacing</h5>
                        <p className="text-sm text-gray-600">16px between related components</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Element Spacing</h5>
                        <p className="text-sm text-gray-600">8px between related elements</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="accessibility">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Accessibility Guidelines</h3>
                    <p className="text-gray-600 mb-6">
                      Our design system follows WCAG 2.1 AA guidelines to ensure 
                      accessibility for all users.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <Contrast className="w-6 h-6 text-blue-600" />
                        <h4 className="text-lg font-semibold text-gray-900">Color Contrast</h4>
                      </div>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Normal text: 4.5:1 contrast ratio</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Large text: 3:1 contrast ratio</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>UI components: 3:1 contrast ratio</span>
                        </li>
                      </ul>
                    </Card>
                    
                    <Card className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <Smartphone className="w-6 h-6 text-blue-600" />
                        <h4 className="text-lg font-semibold text-gray-900">Touch Targets</h4>
                      </div>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Minimum 44px touch targets</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Adequate spacing between elements</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Clear visual feedback</span>
                        </li>
                      </ul>
                    </Card>
                    
                    <Card className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <Type className="w-6 h-6 text-blue-600" />
                        <h4 className="text-lg font-semibold text-gray-900">Typography</h4>
                      </div>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Dynamic type support</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>High contrast mode support</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Screen reader compatibility</span>
                        </li>
                      </ul>
                    </Card>
                    
                    <Card className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <Accessibility className="w-6 h-6 text-blue-600" />
                        <h4 className="text-lg font-semibold text-gray-900">Screen Readers</h4>
                      </div>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Proper accessibility labels</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Semantic roles and states</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Keyboard navigation support</span>
                        </li>
                      </ul>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 bg-gradient-to-r from-purple-600 to-indigo-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Build Beautiful Apps?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Start building with our comprehensive design system and create 
              consistent, accessible React Native applications that users love.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
                <Download className="w-5 h-5 mr-2" />
                Get Started Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
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

export default StyleGuidePage;
