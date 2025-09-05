import { Account } from "../models/account.model";
import { HttpService } from "@/shared/services/axios-http/HttpService";

export class CreateAccountService extends HttpService {

    path: string = 'account';

    createAccount(account: Account): Promise<any> {
        return this.post(`${this.path}/create`, account);
    }

    sendEmailCode(email: string): Promise<any> {
        return this.post(`${this.path}/sendEmailCode`, null, { email });
    }
}