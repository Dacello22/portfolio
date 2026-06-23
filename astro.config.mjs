import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// TODO: update `site` to your real deployed URL once you know your
// workers.dev subdomain (e.g. https://portfolio.william-lunsford.workers.dev)
// or your custom domain. This value is required for the sitemap to emit
// correct absolute URLs.
export default defineConfig({
  site: "https://portfolio.williamlunsford02.workers.dev",
  integrations: [sitemap()],
});
