import type { Metadata } from "next";
import { MarketplaceApp } from "./marketplace-app";

export const metadata: Metadata = {
  title: "CareerCompass — talent marketplace",
  description: "The whole-of-government internal talent marketplace.",
};

export default function MarketplacePage() {
  return <MarketplaceApp />;
}
