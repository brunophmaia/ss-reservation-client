import axios from "axios";
import { Account } from "../models/account.model";
import { HttpService } from "@/shared/services/HttpService";

export class CreateAccountService extends HttpService {

    path: string = 'account';

    createAccount(account: Account) {
        this.post(this.path, account);
    }

    sendEmailCode(email: string) {
        this.post(`${this.path}/sendEmailCode`, null, { email });
    }
}