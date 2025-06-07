# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server at http://localhost:3000
- `pnpm build` - Build production bundle
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint to check code quality

## Architecture Overview

This is a Next.js 15 portfolio website with Ghost CMS integration for blog management. The project uses TypeScript, Tailwind CSS, and Framer Motion for animations.

### Key Architecture Patterns

**App Router Structure**: Uses Next.js 13+ app directory with file-based routing:
- `/blog/[slug]` - Dynamic blog post pages with Ghost CMS integration
- `/projects/[slug]` - Dynamic project detail pages
- Static pages: `/about`, `/contact`, `/resume`

**Layout System**: Sidebar-based layout with mobile responsiveness:
- `Sidebar` component provides main navigation
- Content area with rounded corners and responsive behavior
- Layout defined in `src/app/layout.tsx` with persistent sidebar

**Ghost CMS Integration**: 
- Type-safe Ghost API wrapper in `lib/ghost.ts` using `@ts-ghost/content-api`
- Fallback demo content when Ghost is not configured
- Environment variables: `GHOST_URL` and `GHOST_CONTENT_API_KEY`
- Image optimization configured for Ghost domains in `next.config.mjs`

**Component Architecture**:
- Reusable UI components in `src/components/` (Container, Heading, Paragraph, etc.)
- Static data in `src/constants/` (products, navigation, social links, timeline)
- Type definitions in `src/types/` for Ghost content and component props

**Path Alias**: Uses `@/*` for `./src/*` imports defined in `tsconfig.json`

### Blog System Migration

The project migrated from MDX to Ghost CMS. See `GHOST_SETUP.md` for complete integration instructions. The blog system:
- Fetches posts dynamically from Ghost API
- Supports tags, authors, and featured posts
- Generates static params for SEO optimization
- Falls back to demo content during development

### Project Structure

- `/lib/` - Ghost API utilities and helper functions
- `/src/app/` - Next.js app router pages
- `/src/components/` - Reusable React components  
- `/src/constants/` - Static data and configuration
- `/public/images/` - Static assets and project thumbnails

The portfolio showcases projects defined in `src/constants/products.tsx` with thumbnail images and detailed content pages.