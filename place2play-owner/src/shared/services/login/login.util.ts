import { NextRouter } from "next/router";
import { LoginService } from "./login.service";

export function logout(router: NextRouter, loginService: LoginService){
    loginService.logout().then(() => {
        router.push(process.env.NEXT_PUBLIC_AUTH_URI as string);
    });
}