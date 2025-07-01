import Head from 'next/head'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  keywords?: string[]
}

const defaultSEO = {
  title: 'React Native Boilerplate - Professional Template',
  description: 'A production-ready React Native boilerplate with TypeScript, Navigation, State Management, and modern development tools. Build mobile apps faster with best practices.',
  image: 'https://sohantalukder.github.io/react-native-boilerplate/og-image.png',
  url: 'https://sohantalukder.github.io/react-native-boilerplate',
  type: 'website' as const,
  keywords: ['React Native', 'TypeScript', 'Mobile App', 'Boilerplate', 'Template', 'Navigation', 'State Management', 'iOS', 'Android']
}

export function SEO({
  title,
  description,
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  keywords
}: SEOProps) {
  const seo = {
    title: title ? `${title} | React Native Boilerplate` : defaultSEO.title,
    description: description || defaultSEO.description,
    image: image || defaultSEO.image,
    url: url || defaultSEO.url,
    keywords: keywords || defaultSEO.keywords
  }

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords.join(', ')} />
      <meta name="author" content={author || 'Sohan Talukder'} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={seo.url} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:site_name" content="React Native Boilerplate" />
      <meta property="og:locale" content="en_US" />
      
      {/* Article specific meta tags */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:creator" content="@sohantalukder" />
      <meta name="twitter:site" content="@sohantalukder" />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#3b82f6" />
      <meta name="msapplication-TileColor" content="#3b82f6" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="RN Boilerplate" />
      
      {/* Favicons */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      {/* TODO: Add proper favicon files 
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      */}
      <link rel="manifest" href="/manifest.json" />
      
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "React Native Boilerplate",
            "description": seo.description,
            "url": seo.url,
            "image": seo.image,
            "author": {
              "@type": "Person",
              "name": "Sohan Talukder",
              "email": "mdtalukder.sohan@gmail.com"
            },
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "iOS, Android",
            "programmingLanguage": "TypeScript, JavaScript",
            "keywords": seo.keywords.join(', '),
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })
        }}
      />
    </Head>
  )
} 