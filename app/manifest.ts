import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ذكي - AI-powered Search Engine",
    short_name: "ذكي",
    description: "A minimalistic AI-powered search engine that helps you find information on the internet using advanced AI models like GPT-4, Claude, and Grok",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/dhaki_logo-removebg-preview.png",
        sizes: "any",
        type: "image/png",
      }
    ],
    shortcuts: [],
    screenshots: [],
  };
}