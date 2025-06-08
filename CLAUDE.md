# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` or `pnpm dev` - Start development server
- `npm run build` - Build production version
- `npm run start` - Start production server  
- `npm run lint` - Run ESLint

## Architecture Overview

This is a Next.js 15 portfolio website template called "Sidefolio" with the following key architectural patterns:

### Internationalization Structure
- **Next-intl**: Internationalization with locale-based routing at `/[locale]/*`
- **Root redirect**: Base `/` redirects to `/en` default locale
- **Localized routing**: All pages under `src/app/[locale]/` with dynamic locale parameter

### Layout Structure
- **Sidebar navigation**: Fixed sidebar with main content area (layout in `src/app/[locale]/layout.tsx`)
- **App Router**: Next.js 15 app directory with internationalized routing
- **Component library**: Reusable UI components in `src/components/`

### Content Management System
- **Ghost CMS Integration**: Primary blog content via `@ts-ghost/content-api`
  - Type-safe API wrapper in `lib/ghost.ts` with full CRUD operations
  - Environment variables: `GHOST_URL` and `GHOST_CONTENT_API_KEY`
  - Graceful fallback to demo content when Ghost not configured
  - Dynamic routing at `/[locale]/blog/[slug]`
- **Static Projects**: Project data in `src/constants/products.tsx` with routing at `/[locale]/projects/[slug]`

### Technology Stack
- **Styling**: TailwindCSS v4 with custom configuration
- **Animation**: Framer Motion for component animations  
- **Icons**: Tabler Icons library
- **Typography**: Custom CalSans-SemiBold and Inter fonts
- **Image Optimization**: Next.js Image with remote patterns for Ghost, Unsplash, Cloudinary

### Data Architecture
- **Blog data**: Fetched via `src/lib/getAllBlogs.ts` with Ghost API integration
- **Type safety**: Blog and Product types defined in `src/types/`
- **Static content**: Navigation links, social links, and timeline data in `src/constants/`

### Key Files
- `src/lib/ghost.ts` - Type-safe Ghost CMS API wrapper with utilities
- `src/lib/getAllBlogs.ts` - Blog data fetching with fallback handling
- `src/constants/products.tsx` - Static project data with embedded content
- `next.config.mjs` - Next-intl plugin and image optimization config
- `GHOST_SETUP.md` - Complete Ghost CMS integration guide