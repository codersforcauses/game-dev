import { Art } from "@/types/art";

export const generateMockArtworks = (count: number): Art[] => {
  const artworks: Art[] = [];
  for (let i = 1; i <= count; i++) {
    artworks.push({
      id: i,
      name: `Artwork ${i}`,
      description: "Mock artwork description",
      //source_game: "Mock Game",
      path_to_media: "",
      active: true,
      contributors: [],
      //created_at: new Date().toISOString(),
    });
  }
  return artworks;
};
