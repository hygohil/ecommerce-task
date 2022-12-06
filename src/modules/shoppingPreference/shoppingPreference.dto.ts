import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ShoppingPreferenceDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  id: number;

  @IsNumber()
  userId: number;
}
