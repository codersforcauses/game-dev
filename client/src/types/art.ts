import { BaseDto } from "./base-dto";

export interface Art extends BaseDto {
  name: string;
  description: string;
  path_to_media: string;
  active: boolean;
}
