import { IsEnum, IsNumber, IsString } from 'class-validator';
import { VoteEnum } from '../entities/vote.enum';

export class VoteDto {
  @IsNumber()
  post: number;

  @IsString()
  @IsEnum(VoteEnum)
  vote: VoteEnum;
}
