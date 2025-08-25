import { UserInfo } from "@/shared/models/user-info.model";
import { HttpService } from "@/shared/services/axios-http/HttpService";

export class HomeService extends HttpService {

    getUserInfo(): Promise<UserInfo> {
        return this.get('user/getUserInfo');
    }
}