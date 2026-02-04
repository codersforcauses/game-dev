import { ArtContributor } from "./art-contributor";

export interface Art {
  art_id: number;
  name: string;
  description: string;
  media: string;
  active: boolean;
  contributors: ArtContributor[];
  showcase_description: string;
}
