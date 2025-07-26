# ScanHire

ScanHire is a web application that helps users track job applications and get AI-powered feedback on their resumes. The application allows users to upload their resumes, enter job details, and receive detailed analysis and improvement suggestions.

Built with React Router, this application provides a modern, responsive user experience with server-side rendering capabilities.

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 💰 Google AdSense integration for monetization
- 📖 [React Router docs](https://reactrouter.com/)

## Google AdSense Integration

ScanHire includes a complete Google AdSense integration for monetization. The implementation follows best practices for performance, user experience, and compliance with Google's policies.

### Ad Components

The application includes several reusable ad components:

- **AdSenseComponent**: Base component that wraps the react-adsense package with error handling, loading states, and consistent styling.
- **BannerAd**: Horizontal banner ad typically placed at the top of pages.
- **ResponsiveAd**: Responsive ad that adapts to different container sizes and screen widths.
- **InContentAd**: Ad designed to be placed between sections of content with appropriate styling.

### Configuration

Ad units are configured using environment variables in a `.env` file and accessed through `constants/ads.ts`.

First, create a `.env` file in the root directory:

```
# Toggle between test and production ad units
VITE_USE_TEST_ADS=true

# AdSense publisher IDs
VITE_ADSENSE_TEST_PUBLISHER_ID=ca-pub-3940256099942544
VITE_ADSENSE_PRODUCTION_PUBLISHER_ID=ca-pub-XXXXXXXXXXXXXXXX

# Banner ad unit IDs
VITE_BANNER_HOME_TEST_ID=6300978111
# ... other ad unit IDs
```

Then, in `constants/ads.ts`, the environment variables are used:

```typescript
// Toggle between test and production ad units
export const USE_TEST_ADS = import.meta.env.VITE_USE_TEST_ADS === 'true';

// AdSense publisher ID
export const ADSENSE_PUBLISHER_ID = USE_TEST_ADS 
  ? import.meta.env.VITE_ADSENSE_TEST_PUBLISHER_ID 
  : import.meta.env.VITE_ADSENSE_PRODUCTION_PUBLISHER_ID;

// Ad unit IDs for different placements
export const AD_UNITS = {
  BANNER: { ... },
  RESPONSIVE: { ... },
  IN_CONTENT: { ... }
};
```

### Production Setup

To configure the ads for production:

1. Create a `.env` file in the root directory if it doesn't exist
2. Set `VITE_USE_TEST_ADS=false` to serve real ads
3. Replace `VITE_ADSENSE_PRODUCTION_PUBLISHER_ID` with your actual AdSense publisher ID
4. Replace all production ad unit IDs with your actual ad unit IDs

Example `.env` file for production:

```
# Toggle between test and production ad units
VITE_USE_TEST_ADS=false

# AdSense publisher IDs
VITE_ADSENSE_TEST_PUBLISHER_ID=ca-pub-3940256099942544
VITE_ADSENSE_PRODUCTION_PUBLISHER_ID=ca-pub-YOUR_ACTUAL_PUBLISHER_ID

# Banner ad unit IDs
VITE_BANNER_HOME_PRODUCTION_ID=YOUR_ACTUAL_AD_UNIT_ID
# ... other ad unit IDs
```

During development, you can set `VITE_USE_TEST_ADS=true` to use Google's test ad units, which always serve test ads.

**Note:** The `.env` file is excluded from version control to protect sensitive information. Make sure to set up the environment variables on your production server.

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
