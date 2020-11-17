import { Login } from './login.model';

export class LoginResponse {
    statusCode: number;
    status: string;
    message: string;
    auth: string;
    result: Login;
    expiryTime: number;
}
