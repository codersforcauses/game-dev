import { ArtContributor } from "./art-contributor";

export interface Art {
  id: number;
  name: string;
  description: string;
  media: string;
  active: boolean;
  contributors: ArtContributor[];
}
