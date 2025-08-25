import { HttpService } from "../axios-http/HttpService";

export class LoginService extends HttpService {

    path: string = 'login';

    logout(): Promise<any> {
        return this.post(`${this.path}/logout`);
    }
}