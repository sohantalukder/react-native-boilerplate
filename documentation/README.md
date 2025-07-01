# React Native Boilerplate Documentation

![React Native Boilerplate Banner](https://user-images.githubusercontent.com/74038190/225813708-98b745f2-7d22-48cf-9150-083f1b00d6c9.gif)

This is the documentation website for the React Native Boilerplate template, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🌙 Dark/Light mode support
- 📱 Responsive design
- ⚡ Fast and performant
- 🎨 Beautiful UI with shadcn/ui components
- 📖 Comprehensive documentation
- 🔍 SEO optimized

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Theme**: next-themes

## Getting Started

### Prerequisites

- Node.js 18+ 
- Yarn or npm

### Installation

1. Install dependencies:
```bash
yarn install
# or
npm install
```

2. Start the development server:
```bash
yarn dev
# or
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn export` - Export static site

## Project Structure

```
documentation/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── theme-provider.tsx
│   │   └── theme-toggle.tsx
│   ├── pages/            # Next.js pages
│   │   ├── docs/         # Documentation pages
│   │   ├── _app.tsx      # App wrapper
│   │   └── index.tsx     # Homepage
│   ├── styles/           # Global styles
│   └── lib/              # Utility functions
├── public/               # Static assets
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind configuration
└── tsconfig.json         # TypeScript configuration
```

## Adding New Documentation

1. Create a new page in `src/pages/docs/`
2. Follow the existing pattern for layout and styling
3. Add navigation links in the docs index page
4. Update this README if needed

## Deployment

The site can be deployed to any static hosting platform:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**

For static export:
```bash
yarn export
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## License

This documentation is part of the React Native Boilerplate project and is licensed under the MIT License. 