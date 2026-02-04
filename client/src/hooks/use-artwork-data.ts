import { Art } from "@/types/art";

export const generateMockArtworks = (count: number): Art[] => {
  const artworks: Art[] = [];
  for (let i = 1; i <= count; i++) {
    artworks.push({
      art_id: i,
      name: `Artwork ${i}`,
      description: "Mock artwork description",
      media: `http://localhost:8000/media/art/mock_artwork_${i}.png`,
      active: true,
      contributors: [
        {
          id: i * 10 + 1,
          member_id: i * 10 + 1,
          member_name: "Contributor 1",
          role: "artist",
        },
        {
          id: i * 10 + 2,
          member_id: i * 10 + 2,
          member_name: "Contributor 2",
          role: "designer",
        },
      ],
      showcase_description: `Showcase description for artwork ${i}`,
    });
  }
  return artworks;
};

export const generateMockArtwork = (id: string): Art => {
  return {
    art_id: Number(id),
    name: "Mock Artwork Title",
    description:
      "Lorem ipsum dolor sit amet. Non numquam dicta nam autem dicta 33 error molestias et repellat consequatur eum iste expedita est dolorem libero et quas provident!",
    media: `http://localhost:8000/media/art/mock_artwork_${id}.png`,
    active: true,
    contributors: [
      {
        id: 1,
        member_id: 1,
        member_name: "Contributor 1",
        role: "user1",
      },
      {
        id: 2,
        member_id: 2,
        member_name: "Contributor 2",
        role: "user2",
      },
    ],
    showcase_description: "Featured artwork showcase description",
  };
};
