import { LoginService } from "@/pages/login/service/login.service";
import { NextRouter } from "next/router";

export function logout(router: NextRouter, loginService: LoginService){
    loginService.logout().then(() => {
        router.push('/');
    });
}