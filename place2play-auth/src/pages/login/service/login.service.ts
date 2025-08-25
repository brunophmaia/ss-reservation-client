import { HttpService } from "@/shared/services/axios-http/HttpService";
import { Login } from "../models/Login.model";

export class LoginService extends HttpService {

    path: string = 'login';

    login(login: Login): Promise<any> {
        return this.post(this.path, login);
    }

    logout(): Promise<any> {
        return this.post(`${this.path}/logout`);
    }
}