import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    //name: string;
//   email: number;
//   role: string | 'admin' | 'user' | 'guest';
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsEnum(['admin', 'user', 'guest'], { 
        message: 'role must be either admin, user, or guest' })
    role: 'admin' | 'user' | 'guest';
}