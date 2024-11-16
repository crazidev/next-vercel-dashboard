import { Manifest } from "next/dist/lib/metadata/types/manifest-types";
import images from "../../../public/pwa/icons.json";

export async function GET() {
  const manifest = {
    name: process.env.NEXT_PUBLIC_APP_NAME,
    short_name: process.env.NEXT_PUBLIC_APP_SHORT_NAME,
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
    start_url: "/dashboard",
    id: "hybank",
    display: "standalone",
    display_override: ["window-controls-overlay"],
    // background_color: "white",
    // theme_color: "var(--accent-7)",
    icons: [...images],
  };

  // Return the manifest as JSON
  return new Response(JSON.stringify(manifest), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
