import { StringRequired } from "src/decorator";

export class LoginDto{
    @StringRequired('Email')
    email!: string;

    @StringRequired('Mật khẩu')
    password!: string;
}