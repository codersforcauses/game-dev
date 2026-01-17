import { Art } from "@/types/art";

export const generateMockArtworks = (count: number): Art[] => {
  const artworks: Art[] = [];
  for (let i = 1; i <= count; i++) {
    artworks.push({
      id: i,
      name: `Artwork ${i}`,
      description: "Mock artwork description",
      //source_game: "Mock Game",
      media: "",
      active: true,
      contributors: [],
      //created_at: new Date().toISOString(),
    });
  }
  return artworks;
};

export const generateMockArtwork = (id: string): Art => {
  return {
    id: Number(id),
    name: "Mock Artwork Title",
    description:
      "Lorem ipsum dolor sit amet. Non numquam dicta nam autem dicta 33 error molestias et repellat consequatur eum iste expedita est dolorem libero et quas provident!",
    //source_game: "Mock Game",
    media: "",
    active: true,
    //created_at: new Date().toISOString(),
    contributors: [
      {
        id: 1,
        art_id: Number(id),
        member_name: "Contributor 1",
        role: "user1",
        discord_url: "https://discord.com",
        instagram_url: "",
      },
      {
        id: 2,
        art_id: Number(id),
        member_name: "Contributor 2",
        role: "user2",
        discord_url: "",
        instagram_url: "https://instagram.com",
      },
    ],
  };
};
