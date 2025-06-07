import {
  TSGhostContentAPI,
  type Author,
  type Page,
  type Post,
  type Settings,
  type Tag,
} from "@ts-ghost/content-api";

// Initialize TypeScript Ghost Content API
const api = new TSGhostContentAPI(
  process.env.GHOST_URL || "https://demo.ghost.io",
  process.env.GHOST_CONTENT_API_KEY || "",
  "v5.0"
);

// Type-safe Ghost API wrapper with full TypeScript support
export const ghostApi = {
  posts: {
    browse: async (options?: {
      limit?: number;
      page?: number;
      filter?: string;
      order?: string;
    }) => {
      const response = await api.posts
        .browse(options || {})
        .include({ authors: true, tags: true })
        .fetch();

      if (!response.success) {
        throw new Error(response.errors.map((e) => e.message).join(", "));
      }

      return response.data;
    },

    read: async (options: { slug: string } | { id: string }) => {
      const response = await api.posts
        .read(options)
        .include({ authors: true, tags: true })
        .fetch();

      if (!response.success) {
        throw new Error(response.errors.map((e) => e.message).join(", "));
      }

      return response.data;
    },

    readBySlug: async (slug: string) => {
      const response = await api.posts
        .read({ slug })
        .include({ authors: true, tags: true })
        .fetch();

      if (!response.success) {
        throw new Error(response.errors.map((e) => e.message).join(", "));
      }

      return response.data;
    },
  },

  pages: {
    browse: async (options?: {
      limit?: number;
      page?: number;
      filter?: string;
      order?: string;
    }) => {
      const response = await api.pages
        .browse(options || {})
        .include({ authors: true, tags: true })
        .fetch();

      if (!response.success) {
        throw new Error(response.errors.map((e) => e.message).join(", "));
      }

      return response.data;
    },

    read: async (options: { slug: string } | { id: string }) => {
      const response = await api.pages
        .read(options)
        .include({ authors: true, tags: true })
        .fetch();

      if (!response.success) {
        throw new Error(response.errors.map((e) => e.message).join(", "));
      }

      return response.data;
    },
  },

  authors: {
    browse: async (options?: {
      limit?: number;
      page?: number;
      filter?: string;
      order?: string;
    }) => {
      const response = await api.authors
        .browse(options || {})
        .include({ "count.posts": true })
        .fetch();

      if (!response.success) {
        throw new Error(response.errors.map((e) => e.message).join(", "));
      }

      return response.data;
    },

    read: async (options: { slug: string } | { id: string }) => {
      const response = await api.authors
        .read(options)
        .include({ "count.posts": true })
        .fetch();

      if (!response.success) {
        throw new Error(response.errors.map((e) => e.message).join(", "));
      }

      return response.data;
    },
  },

  tags: {
    browse: async (options?: {
      limit?: number;
      page?: number;
      filter?: string;
      order?: string;
    }) => {
      const response = await api.tags
        .browse(options || {})
        .include({ "count.posts": true })
        .fetch();

      if (!response.success) {
        throw new Error(response.errors.map((e) => e.message).join(", "));
      }

      return response.data;
    },

    read: async (options: { slug: string } | { id: string }) => {
      const response = await api.tags
        .read(options)
        .include({ "count.posts": true })
        .fetch();

      if (!response.success) {
        throw new Error(response.errors.map((e) => e.message).join(", "));
      }

      return response.data;
    },
  },

  settings: {
    fetch: async () => {
      const response = await api.settings.fetch();

      if (!response.success) {
        throw new Error(response.errors.map((e) => e.message).join(", "));
      }

      return response.data;
    },
  },
};

// Helper utilities with full type safety
export const ghostUtils = {
  /**
   * Get all published posts with optional filtering
   */
  getAllPosts: async (limit = 15) => {
    const response = await api.posts
      .browse({ limit })
      .include({ authors: true, tags: true })
      .fetch();

    if (!response.success) {
      throw new Error(response.errors.join(", "));
    }

    return response.data;
  },

  /**
   * Get a single post by slug with all related data
   */
  getPostBySlug: async (slug: string) => {
    const response = await api.posts
      .read({ slug })
      .include({ authors: true, tags: true })
      .fetch();

    if (!response.success) {
      throw new Error(response.errors.join(", "));
    }

    return response.data;
  },

  /**
   * Get featured posts
   */
  getFeaturedPosts: async (limit = 5) => {
    const response = await api.posts
      .browse({ limit })
      .include({ authors: true, tags: true })
      .fetch();

    if (!response.success) {
      throw new Error(response.errors.join(", "));
    }

    return response.data.filter((post) => post.featured);
  },

  /**
   * Get posts by tag
   */
  getPostsByTag: async (tagSlug: string, limit = 10) => {
    const response = await api.posts
      .browse({ limit })
      .include({ authors: true, tags: true })
      .fetch();

    if (!response.success) {
      throw new Error(response.errors.join(", "));
    }

    return response.data.filter((post) =>
      post.tags?.some((tag) => tag.slug === tagSlug)
    );
  },

  /**
   * Get posts by author
   */
  getPostsByAuthor: async (authorSlug: string, limit = 10) => {
    const response = await api.posts
      .browse({ limit })
      .include({ authors: true, tags: true })
      .fetch();

    if (!response.success) {
      throw new Error(response.errors.join(", "));
    }

    return response.data.filter((post) =>
      post.authors?.some((author) => author.slug === authorSlug)
    );
  },

  /**
   * Get site settings
   */
  getSiteSettings: async () => {
    const response = await api.settings.fetch();

    if (!response.success) {
      throw new Error(response.errors.join(", "));
    }

    return response.data;
  },

  /**
   * Get all posts with pagination support
   */
  getAllPostsPaginated: async () => {
    const posts: Post[] = [];
    let cursor = await api.posts
      .browse()
      .include({ authors: true, tags: true })
      .paginate();

    if (cursor.current.success) {
      posts.push(...cursor.current.data);
    }

    while (cursor.next) {
      cursor = await cursor.next.paginate();
      if (cursor.current.success) {
        posts.push(...cursor.current.data);
      }
    }

    return posts;
  },
};

// Export types for use in other files
export type { Author, Page, Post, Settings, Tag };

// Export the main API instance
export default api;
