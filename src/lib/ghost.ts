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
        .fetch();

      if (!response.success) {
        throw new Error(response.errors.map((e) => e.message).join(", "));
      }

      return response.data;
    },

    read: async (options: { slug: string } | { id: string }) => {
      const response = await api.authors.read(options).fetch();

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
      const response = await api.tags.browse(options || {}).fetch();

      if (!response.success) {
        throw new Error(response.errors.map((e) => e.message).join(", "));
      }

      return response.data;
    },

    read: async (options: { slug: string } | { id: string }) => {
      const response = await api.tags.read(options).fetch();

      if (!response.success) {
        throw new Error(response.errors.map((e) => e.message).join(", "));
      }

      return response.data;
    },
  },

  settings: {
    browse: async () => {
      const response = await api.settings.browse().fetch();

      if (!response.success) {
        throw new Error(response.errors.map((e) => e.message).join(", "));
      }

      return response.data;
    },
  },
};

// Export Ghost types for convenience
export type { Author, Page, Post, Settings, Tag };

// Utility functions for common Ghost operations
export const ghostUtils = {
  /**
   * Fetches all posts from Ghost CMS.
   * @returns A promise that resolves to an array of Post objects.
   */
  getAllPosts: async (): Promise<Post[]> => {
    return ghostApi.posts.browse({ limit: "all" });
  },

  /**
   * Fetches a single post by its slug from Ghost CMS.
   * @param slug The slug of the post to fetch.
   * @returns A promise that resolves to a Post object.
   */
  getPostBySlug: async (slug: string): Promise<Post> => {
    return ghostApi.posts.readBySlug(slug);
  },

  /**
   * Fetches all pages from Ghost CMS.
   * @returns A promise that resolves to an array of Page objects.
   */
  getAllPages: async (): Promise<Page[]> => {
    return ghostApi.pages.browse({ limit: "all" });
  },

  /**
   * Fetches a single page by its slug from Ghost CMS.
   * @param slug The slug of the page to fetch.
   * @returns A promise that resolves to a Page object.
   */
  getPageBySlug: async (slug: string): Promise<Page> => {
    return ghostApi.pages.read({ slug });
  },

  /**
   * Fetches all authors from Ghost CMS.
   * @returns A promise that resolves to an array of Author objects.
   */
  getAllAuthors: async (): Promise<Author[]> => {
    return ghostApi.authors.browse({ limit: "all" });
  },

  /**
   * Fetches a single author by their slug from Ghost CMS.
   * @param slug The slug of the author to fetch.
   * @returns A promise that resolves to an Author object.
   */
  getAuthorBySlug: async (slug: string): Promise<Author> => {
    return ghostApi.authors.read({ slug });
  },

  /**
   * Fetches all tags from Ghost CMS.
   * @returns A promise that resolves to an array of Tag objects.
   */
  getAllTags: async (): Promise<Tag[]> => {
    return ghostApi.tags.browse({ limit: "all" });
  },

  /**
   * Fetches a single tag by its slug from Ghost CMS.
   * @param slug The slug of the tag to fetch.
   * @returns A promise that resolves to a Tag object.
   */
  getTagBySlug: async (slug: string): Promise<Tag> => {
    return ghostApi.tags.read({ slug });
  },

  /**
   * Fetches the site settings from Ghost CMS.
   * @returns A promise that resolves to a Settings object.
   */
  getSettings: async (): Promise<Settings> => {
    return ghostApi.settings.browse();
  },

  /**
   * Generates a filter string for fetching posts by tag.
   * @param tagSlug The slug of the tag to filter by.
   * @returns A filter string for the Ghost API.
   */
  filterByTag: (tagSlug: string): string => {
    return `tags:[${tagSlug}]`;
  },

  /**
   * Generates a filter string for fetching posts by author.
   * @param authorSlug The slug of the author to filter by.
   * @returns A filter string for the Ghost API.
   */
  filterByAuthor: (authorSlug: string): string => {
    return `authors:[${authorSlug}]`;
  },

  /**
   * Paginates an array of items.
   * @param items The array of items to paginate.
   * @param pageNumber The current page number (1-indexed).
   * @param pageSize The number of items per page.
   * @returns An object containing the paginated items and pagination metadata.
   */
  paginate: <T>(items: T[], pageNumber: number, pageSize: number) => {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedItems = items.slice(startIndex, endIndex);
    const totalPages = Math.ceil(items.length / pageSize);

    return {
      items: paginatedItems,
      pageNumber,
      pageSize,
      totalPages,
      totalItems: items.length,
      hasNextPage: pageNumber < totalPages,
      hasPreviousPage: pageNumber > 1,
    };
  },
};
