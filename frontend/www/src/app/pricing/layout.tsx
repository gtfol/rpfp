import { defaultMetadata, defaultOpenGraph } from "@/constants/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Pricing | Remove People from Photos",
  openGraph: {
    ...defaultOpenGraph,
    title: "Pricing | Remove People from Photos",
  },
};

export default function PricingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
