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
      contributors: [
        {
          id: i * 10 + 1,
          art_id: i,
          member_name: "Contributor 1",
          role: "artist",
        },
        {
          id: i * 10 + 2,
          art_id: i,
          member_name: "Contributor 2",
          role: "designer",
        },
      ],
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
      },
      {
        id: 2,
        art_id: Number(id),
        member_name: "Contributor 2",
        role: "user2",
      },
    ],
  };
};
