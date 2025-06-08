import { Author } from "@/lib/ghost";

export type Blog = {
  title: string;
  description: string;
  date: string;
  slug: string;
  image: string;
  tags?: string[];
  html?: string;
  plaintext?: string;
  reading_time?: number;
  authors?: Author[];
  id?: string;
  featured?: boolean;
  created_at?: string | null;
  updated_at?: string | null;
  excerpt?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
};
