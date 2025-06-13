# Codebase Overview

This project is a portfolio website built with **Next.js 15** using the App Router and TypeScript. Internationalization is handled with `next-intl` and content for the blog is fetched from **Ghost CMS** with fallback demo data. Styling is provided by **Tailwind CSS** and components leverage **Framer Motion** for animations.

## Key Directories

- `src/app/` – App Router pages organized by locale in `[locale]/`. Root layout and global styles are defined here.
- `src/components/` – Reusable React components such as the sidebar, footer, blog layout, and various UI pieces.
- `src/constants/` – Static data including navigation links, social links, project information, and timeline entries for the resume.
- `src/lib/` – Utility functions and Ghost CMS API wrapper (`ghost.ts`) along with helpers like `getAllBlogs.ts`.
- `src/messages/` – Locale-specific translation JSON files used by `next-intl`.
- `src/types/` – TypeScript type definitions for blogs, navigation links, and products.
- `public/` – Static assets like images and icons.

## Internationalization

Locales are defined in `src/i18n-config.ts` and loaded with `src/i18n.ts`. The `middleware.ts` file ensures the locale prefix is present in every route.

```
export const locales = ['en', 'pt', 'de'] as const;
export const defaultLocale = 'en' as const;
```

## Blog Content

Blog posts are fetched from Ghost CMS via the typed utility in `src/lib/ghost.ts`. If the `GHOST_URL` and `GHOST_CONTENT_API_KEY` environment variables are not set, fallback posts from `getAllBlogs.ts` are used.

## Build and Development

- `npm run dev` – Start the development server
- `npm run build` – Build the production version
- `npm run start` – Start the production server
- `npm run lint` – Run ESLint
- `npm run typecheck` – Run the TypeScript compiler

For more details on Ghost CMS integration see **GHOST_SETUP.md**.
