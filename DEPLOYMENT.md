# GitHub Pages Deployment Guide

## 🚀 Quick Setup

### 1. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Make sure the repository is public or you have GitHub Pro/Team

### 2. Required Repository Settings
- **Pages Source**: GitHub Actions (not Deploy from branch)
- **Repository Visibility**: Public (or GitHub Pro for private repos)
- **Actions Permissions**: Allow all actions and reusable workflows

### 3. Automatic Deployment
The documentation deploys automatically when you push changes to:
- `documentation/` folder
- `.github/workflows/deploy-docs.yml` file

**Build Status**: https://github.com/USERNAME/react-native-boilerplate/actions
**Live Site**: https://USERNAME.github.io/react-native-boilerplate/

## 🔧 Local Development

```bash
# Start development server (no GitHub Pages paths)
cd documentation
yarn dev
# Visit: http://localhost:3000

# Test GitHub Pages build locally
yarn build:github
yarn serve out
# Visit: http://localhost:3000/react-native-boilerplate
```

## 🛠️ Manual Deployment

If you need to deploy manually:

```bash
cd documentation
yarn install
yarn build:github
# Upload the 'out' folder to your hosting service
```

## 🔍 Troubleshooting

### Development Server Shows 404s for Assets
1. Stop the development server: `Ctrl+C`
2. Clear cache: `rm -rf .next`
3. Restart: `yarn dev`

### Deployment Fails with "HttpError: Not Found"
1. Ensure GitHub Pages is enabled in repository settings
2. Check that the repository is public
3. Verify Actions have write permissions

### Assets Return 404 on GitHub Pages
- Check that `GITHUB_PAGES=true` is set during build
- Verify the repository name matches the basePath

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next node_modules/.cache
yarn install
yarn build:github
```

## 📁 File Structure
```
documentation/
├── out/                 # Built static files
├── src/
│   ├── pages/          # Next.js pages
│   └── components/     # React components
├── public/             # Static assets
├── package.json        # Dependencies & scripts
└── next.config.js      # Next.js configuration
``` 