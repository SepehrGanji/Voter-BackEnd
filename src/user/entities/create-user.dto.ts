import { GenderEnum } from './gender.enum';
import { IsNotEmpty, IsString, IsEmail, IsEnum } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsEnum(GenderEnum)
    sex: GenderEnum;
}
