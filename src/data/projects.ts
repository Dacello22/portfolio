export interface Project {
  title: string;
  description: string;
  image?: string;
  tags: string[];
  link?: string;
}

// Swap these placeholders for your real games/projects.
// `image` can point at an R2-hosted asset via the r2Url() helper.
export const projects: Project[] = [
  {
    title: "Sample Game Project",
    description: "Short description of the game: genre, engine, your role, and what shipped.",
    tags: ["Unity", "C#", "Gameplay"],
    link: "https://example.com",
  },
];
