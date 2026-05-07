import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Test",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      "max-image-preview": "none",
      "max-snippet": 0,
      "max-video-preview": 0,
    },
  },
};

export default function TestImagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
