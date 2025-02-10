import { defaultMetadata, defaultOpenGraph } from "@/constants/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "privacy policy | gtfol",
  openGraph: {
    ...defaultOpenGraph,
    title: "privacy policy | gtfol",
  },
};

export default function PrivacyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
