# Deployment Guide

This guide explains how to deploy the React Native Boilerplate documentation to GitHub Pages.

## Automatic Deployment

The documentation is automatically deployed to GitHub Pages using GitHub Actions whenever changes are pushed to the `main` or `master` branch in the `documentation/` folder.

### Setup Requirements

1. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "GitHub Actions" as the source

2. **Repository Settings**:
   - Ensure GitHub Actions have write permissions
   - The workflow will automatically handle the deployment

### Workflow Configuration

The deployment workflow (`.github/workflows/deploy-docs.yml`) will:
- Trigger on pushes to main/master branch affecting documentation
- Build the Next.js static site
- Deploy to GitHub Pages
- Make the site available at: `https://sohantalukder.github.io/react-native-boilerplate/`

## Manual Deployment

If you need to deploy manually:

```bash
# Navigate to documentation folder
cd documentation

# Install dependencies
npm install

# Build the static site
npm run build

# The built files will be in the 'out' directory
# You can serve them locally to test:
npm run serve
```

## Custom Domain Setup

To use a custom domain:

1. Update the `CNAME` file in `documentation/public/` with your domain
2. Configure your domain's DNS to point to GitHub Pages
3. Update the URLs in:
   - `src/components/seo.tsx` (defaultSEO object)
   - `public/sitemap.xml`
   - `public/robots.txt`
   - `next.config.js` (basePath and assetPrefix)

## SEO Configuration

The site is optimized for SEO with:

- **Meta Tags**: Title, description, keywords for each page
- **Open Graph**: Social media sharing optimization
- **Twitter Cards**: Enhanced Twitter sharing
- **Structured Data**: JSON-LD for search engines
- **Sitemap**: XML sitemap for search engine crawling
- **Robots.txt**: Search engine crawling instructions
- **Manifest**: PWA manifest for mobile optimization

## Performance Optimization

The deployment includes:

- Static site generation for fast loading
- Image optimization disabled for GitHub Pages compatibility
- Automatic code splitting
- CSS optimization
- Asset compression

## Monitoring

After deployment, you can:

- Check GitHub Actions tab for deployment status
- Monitor site performance with tools like:
  - Google PageSpeed Insights
  - GTmetrix
  - WebPageTest

## Troubleshooting

### Common Issues

1. **404 errors**: Ensure `basePath` is correctly set in `next.config.js`
2. **Missing assets**: Check that `assetPrefix` matches your GitHub Pages URL
3. **Build failures**: Check the Actions tab for detailed error logs

### Environment Variables

For production builds, ensure these are set correctly:
- `NODE_ENV=production`
- Custom environment variables in GitHub repository secrets if needed

## Security

The deployment follows security best practices:
- No sensitive data in the static build
- Proper CSP headers where applicable
- HTTPS enforced by GitHub Pages 