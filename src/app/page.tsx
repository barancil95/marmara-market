import { Suspense } from "react";
import { ListingsBrowser } from "@/components/ListingsBrowser";

export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <ListingsBrowser />
    </Suspense>
  );
}
