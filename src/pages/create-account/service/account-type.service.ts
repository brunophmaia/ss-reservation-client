import { HttpService } from "@/shared/services/axios-http/HttpService";
import { AccountType } from "../models/account-type.model";

export class AccountTypeService extends HttpService {

    path: string = 'accountType';

    getAll(): Promise<Array<AccountType>> {
        return this.get(`${this.path}/getAll`);
    }
}