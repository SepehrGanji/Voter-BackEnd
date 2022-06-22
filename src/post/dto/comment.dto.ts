import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CommentDto {
  @IsNumber()
  post: number;

  @IsString()
  @IsNotEmpty()
  text: string;
}
