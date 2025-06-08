declare module "@tryghost/content-api" {
  interface GhostAPI {
    posts: {
      browse(options?: BrowseOptions): Promise<PostsOrPages>;
      read(data: ReadOptions, options?: ReadOptions): Promise<PostOrPage>;
    };
    pages: {
      browse(options?: BrowseOptions): Promise<PostsOrPages>;
      read(data: ReadOptions, options?: ReadOptions): Promise<PostOrPage>;
    };
    authors: {
      browse(options?: BrowseOptions): Promise<Authors>;
      read(data: ReadOptions, options?: ReadOptions): Promise<Author>;
    };
    tags: {
      browse(options?: BrowseOptions): Promise<Tags>;
      read(data: ReadOptions, options?: ReadOptions): Promise<Tag>;
    };
    settings: {
      browse(): Promise<Settings>;
    };
  }

  interface BrowseOptions {
    limit?: number | "all";
    page?: number;
    filter?: string;
    include?: string;
    order?: string;
    formats?: string;
  }

  interface ReadOptions {
    id?: string;
    slug?: string;
    include?: string;
    formats?: string;
  }

  interface PostOrPage {
    id: string;
    uuid: string;
    title: string;
    slug: string;
    html: string;
    plaintext: string;
    feature_image: string;
    featured: boolean;
    published_at: string;
    created_at: string;
    updated_at: string;
    excerpt: string;
    meta_title: string;
    meta_description: string;
    tags: Tag[];
    authors: Author[];
    reading_time: number;
  }

  interface PostsOrPages {
    posts?: PostOrPage[];
    pages?: PostOrPage[];
    meta: {
      pagination: {
        page: number;
        limit: number;
        pages: number;
        total: number;
        next: number | null;
        prev: number | null;
      };
    };
  }

  interface Author {
    id: string;
    name: string;
    slug: string;
    bio: string;
    cover_image: string;
    profile_image: string;
    location: string;
    website: string;
    twitter: string;
    facebook: string;
  }

  interface Authors {
    authors: Author[];
    meta: {
      pagination: {
        page: number;
        limit: number;
        pages: number;
        total: number;
        next: number | null;
        prev: number | null;
      };
    };
  }

  interface Tag {
    id: string;
    name: string;
    slug: string;
    description: string;
    feature_image: string;
    visibility: string;
    meta_title: string;
    meta_description: string;
    url: string;
  }

  interface Tags {
    tags: Tag[];
    meta: {
      pagination: {
        page: number;
        limit: number;
        pages: number;
        total: number;
        next: number | null;
        prev: number | null;
      };
    };
  }

  interface Settings {
    title: string;
    description: string;
    logo: string;
    icon: string;
    accent_color: string;
    cover_image: string;
    lang: string;
    timezone: string;
    navigation: Navigation[];
    secondary_navigation: Navigation[];
    meta_title: string;
    meta_description: string;
    og_image: string;
    og_title: string;
    og_description: string;
    twitter_image: string;
    twitter_title: string;
    twitter_description: string;
    members_support_address: string;
    url: string;
  }

  interface Navigation {
    label: string;
    url: string;
  }

  const GhostContentAPI: new (options: {
    url: string;
    key: string;
    version: string;
  }) => GhostAPI;

  export = GhostContentAPI;
}
