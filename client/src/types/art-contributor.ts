import { BaseDto } from "./base-dto";

export interface ArtContributor extends BaseDto {
  art_id: number;
  member_name: string;
  role: string;
  instagram_url?: string; // TODO [HanMinh] to refine where to get these info
  discord_url?: string;
}
