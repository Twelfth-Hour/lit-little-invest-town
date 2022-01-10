const dev = "production";

export const server =
  dev == "development"
    ? "http://localhost:3000"
    : "https://little-invest-town.vercel.app";
