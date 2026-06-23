/**
 * Builds a public URL for an asset stored in the R2 bucket.
 * Set PUBLIC_R2_BASE_URL to your R2 public bucket URL (r2.dev or custom domain).
 */
export function r2Url(path: string): string {
  const base = import.meta.env.PUBLIC_R2_BASE_URL ?? "";
  return `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}
