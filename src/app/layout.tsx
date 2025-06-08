import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "John Doe - Developer",
  description:
    "John Doe is a developer, writer and speaker. He is a digital nomad and travels around the world while working remotely.",
};

// Since we have a `not-found.tsx` file in the root directory,
// a layout file is required.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
