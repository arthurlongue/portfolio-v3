# Ghost CMS Integration

This project has been migrated from MDX to Ghost CMS for blog management.

## Setup Instructions

### 1. Set up Ghost CMS

You can use either:

- **Ghost(Pro)** - Hosted solution at https://ghost.org/pricing/
- **Self-hosted Ghost** - Install on your own server
- **Local Ghost** - For development

### 2. Get your API credentials

1. Go to your Ghost Admin panel
2. Navigate to **Settings** → **Integrations**
3. Create a new **Custom Integration**
4. Copy the **Content API Key** and your **API URL**

### 3. Configure environment variables

Create or update your `.env.local` file:

```env
# Ghost CMS Configuration
GHOST_API_URL=https://your-ghost-site.com
GHOST_CONTENT_API_KEY=your_content_api_key_here
```

### 4. Update Next.js configuration

In `next.config.mjs`, add your Ghost domain to the images configuration:

```javascript
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "res.cloudinary.com",
      "your-ghost-site.com", // Add your Ghost domain here
    ],
  },
};
```

### 5. Test the integration

1. Run `npm run dev` or `pnpm dev`
2. Navigate to `/blog` to see your Ghost posts
3. If Ghost is not configured, you'll see fallback demo posts

## Features

- ✅ Automatic post fetching from Ghost CMS
- ✅ Dynamic routing for blog posts (`/blog/[slug]`)
- ✅ Image optimization with Next.js Image component
- ✅ Tag support
- ✅ Reading time estimation
- ✅ SEO metadata generation
- ✅ Fallback demo content when Ghost is not configured

## Migration Notes

The following changes were made during the migration:

1. **Removed MDX dependencies**: `@next/mdx`, `@mdx-js/loader`, etc.
2. **Added Ghost Content API**: `@tryghost/content-api`
3. **Updated blog data structure** to match Ghost's API response
4. **Created dynamic routing** for blog posts at `/blog/[slug]`
5. **Added fallback content** for development without Ghost setup

## Troubleshooting

### Ghost API errors

- Check your API URL and key in `.env.local`
- Ensure your Ghost site is accessible
- Verify the API key has the correct permissions

### Image loading issues

- Add your Ghost domain to `next.config.mjs`
- Check if images exist and are accessible

### No posts showing

- Verify you have published posts in Ghost
- Check browser console for API errors
- Ensure environment variables are loaded correctly
