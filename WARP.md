# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**flowbox-landing** is a Next.js 16.0.1 landing page application using React 19.2.0, TypeScript, and Tailwind CSS v4. The project follows Next.js App Router architecture and is deployed on Vercel.

### Tech Stack
- **Framework**: Next.js 16.0.1 (App Router)
- **Runtime**: React 19.2.0
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 (PostCSS-based)
- **Fonts**: Geist Sans & Geist Mono (via next/font)
- **Linting**: ESLint 9 with Next.js configuration
- **Deployment**: Vercel

## Development Commands

### Start Development Server
```bash
npm run dev
```
Starts Next.js development server on http://localhost:3000 with Fast Refresh enabled.

### Build for Production
```bash
npm run build
```
Creates optimized production build in `.next/` directory.

### Start Production Server
```bash
npm run start
```
Starts production server (requires `npm run build` first).

### Lint Code
```bash
npm run lint
```
Runs ESLint to check for code quality issues.

## Project Architecture

### App Router Structure
This project uses Next.js App Router (introduced in Next.js 13+):

- **`src/app/`** - App Router directory containing all routes and layouts
  - `layout.tsx` - Root layout with Navbar, fonts, and theme providers
  - `page.tsx` - Server component that renders WidgetsShowcase (route: `/`)
  - `client-side/page.tsx` - Client component that renders WidgetsShowcase (route: `/client-side`)
  - `flow-tester/page.tsx` - Interactive Flow Tester page (route: `/flow-tester`)
  - `theme.ts` - Material UI custom theme configuration
  - `globals.css` - Global styles with Tailwind imports and CSS variables
  - `favicon.ico` - Site favicon

- **`src/components/`** - Reusable React components
  - `Navbar.tsx` - Application navigation bar with route highlighting
  - `WidgetsShowcase.tsx` - Reusable widgets showcase component (client component due to MUI hooks)

- **`src/components/widgets/`** - Widget components for showcasing different display styles
  - `FlowTester.tsx` - Interactive component for testing custom Flow Keys
  - `WidgetV1.tsx` - Legacy V1 widget implementation (basic grid layout)
  - `CarouselWidget.tsx` - V2 carousel with navigation and product tags
  - `PhotowallWidget.tsx` - V2 masonry-style photo grid with varied layouts
  - `TikTokWidget.tsx` - V2 vertical video feed with TikTok-style interactions

### TypeScript Configuration
- **Path Aliases**: `@/*` maps to `src/*` for cleaner imports
  ```typescript
  import Component from "@/app/component"; // instead of "../../app/component"
  ```
- **Strict Mode**: Enabled for better type safety
- **Target**: ES2017 for broad browser compatibility

### Styling Approach
- **Material UI (MUI) v7.2.0**: Primary UI component library
  - Integrated with Next.js App Router via `@mui/material-nextjs`
  - Uses Emotion for CSS-in-JS styling
  - Custom theme in `src/app/theme.ts` with branded colors and typography
  - `AppRouterCacheProvider` wraps the app for proper SSR support
  - CSS theme variables enabled for improved performance
- **Tailwind CSS v4**: Complementary utility-first CSS framework
  - Import via `@import "tailwindcss"` in `globals.css`
  - Configuration through `@theme` blocks in CSS
  - Plugin configured in `postcss.config.mjs` as `@tailwindcss/postcss`
- **CSS Variables**: Theme colors defined in `:root` with dark mode support
- **Dark Mode**: Automatically switches based on `prefers-color-scheme`

### Font Setup
The project uses **Inter** font via Next.js `next/font`:
- **Inter**: Primary font (CSS variable: `--font-inter`)
- Weights: 300, 400, 500, 700
- Optimized automatically by Next.js (no external requests, self-hosted)
- Integrated with Material UI theme via `fontFamily: 'var(--font-inter)'`

## Key Configuration Files

- **`next.config.ts`**: Next.js configuration (currently minimal/default)
- **`tsconfig.json`**: TypeScript compiler options with Next.js plugin and path aliases
- **`eslint.config.mjs`**: ESLint 9 flat config with Next.js Core Web Vitals and TypeScript rules
- **`postcss.config.mjs`**: PostCSS configuration for Tailwind CSS v4
- **`src/app/globals.css`**: Global styles, Tailwind import, and theme variables
- **`package.json`**: Dependencies and npm scripts

## Deployment

This project is configured for Vercel deployment:
- **Project**: flowbox-landing
- **Organization**: team_YoOK7sRbMb27gTxYrhyQDNDY
- **Config**: `.vercel/project.json`

Deployment is automatic on git push when connected to Vercel.

## Flowbox Integration

### Widget Implementation
All widgets use the official Flowbox React integration pattern from their documentation:

```typescript
const FlowboxEmbedFlow = () => {
  const flowboxKey = "YOUR_FLOW_KEY";

  useEffect(() => {
    const initializeFlowbox = () => {
      if (window.flowbox) {
        window.flowbox("init", {
          container: "#js-flowbox-flow",
          key: flowboxKey,
          locale: "en-US" // Format: language-COUNTRY (e.g., sv-SE, es-ES)
        });
      }
    };

    const scriptId = "flowbox-js-embed";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.async = true;
      script.src = "https://connect.getflowbox.com/flowbox.js";
      script.onload = initializeFlowbox;
      document.body.appendChild(script);
    } else {
      initializeFlowbox();
    }
  }, []);

  return <div id="js-flowbox-flow"></div>;
};
```

### Configuration
- **Flow Key**: Obtain from Flowbox dashboard ("Copy Flow Key" in the meatball menu)
- **Locale**: Format is `language-COUNTRY` (not `language_COUNTRY`)
  - Translates UI text within the flow
  - Specifies which catalog to fetch product data from
- **Container**: Must match the `id` of the target div element

### Widget Types
- **Flow Tester**: Interactive component allowing users to input their own Flow Key and locale to render any flow in real-time
- **V1 Widget**: Legacy implementation for comparison
- **Carousel Widget**: Horizontal scrolling with product tags and navigation
- **Photowall Widget**: Masonry grid layout with varied image sizes
- **TikTok Widget**: Vertical video feed optimized for 9:16 aspect ratio

### Interactive Flow Tester
The Flow Tester component (`FlowTester.tsx`) provides an interactive testing interface:
- **Features**:
  - Text input for Flow Key entry
  - Locale selector with 13+ language/region options
  - Real-time flow rendering
  - Loading states and error handling
  - Reset functionality to test multiple flows
- **User Experience**:
  - Enter key support for quick rendering
  - Success/error alerts with helpful messages
  - Visual loading indicators
  - Tips section for guidance
- **Technical Implementation**:
  - Uses React refs for dynamic container management
  - Unique container IDs per render to avoid conflicts
  - Automatic Flowbox script loading
  - Clean state management with hooks

## Important Notes

### Next.js 16 & React 19
- This project uses Next.js 16.0.1 with React 19.2.0
- React 19 includes breaking changes (e.g., new JSX transform, updated hooks)
- Async Request APIs (`params`, `searchParams`) are now required to be awaited in Next.js 16

### Tailwind CSS v4
- **Breaking change from v3**: Uses PostCSS plugin instead of separate config file
- Configuration is CSS-based via `@theme` blocks, not JavaScript
- Import using `@import "tailwindcss"` instead of old `@tailwind` directives

### ESLint 9
- Uses new flat config format (`eslint.config.mjs`) instead of `.eslintrc`
- Includes Next.js Core Web Vitals and TypeScript rules out of the box
