import { HttpService } from "../axios-http/HttpService";

export class LoginService extends HttpService {

    path: string = 'auth';

    logout(): Promise<any> {
        return this.post(`${this.path}/logout`);
    }
}