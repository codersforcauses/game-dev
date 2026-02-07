import { ArtContributor } from "./art-contributor";

export interface Art {
  art_id: number;
  name: string;
  description: string;
  media: string;
  active: boolean;
  source_game_id: number | null;
  source_game_name: string | null;
  contributors: ArtContributor[];
  showcase_description: string;
}
