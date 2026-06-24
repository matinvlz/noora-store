import StudioPageClient from "./client";

// Required for static export: pre-render the root /studio path only
export function generateStaticParams() {
  return [{ tool: [] }];
}

export default function StudioPage() {
  return <StudioPageClient />;
}
