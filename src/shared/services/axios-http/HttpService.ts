import { AxiosInstance } from "axios";
import createAxiosInstance from "./axios-instance";

export class HttpService {

    axios: AxiosInstance;
    url: string = process.env.NEXT_PUBLIC_API_URL as string;
    
    constructor(){
        this.axios = createAxiosInstance();
    }

    get(path: string): Promise<any> {
        return this.axios.get(`${this.url}/${path}`);
    }

    post(path: string, bodyData?: any, params?: any): Promise<any> {
        return this.axios.post(`${this.url}/${path}`, bodyData, { params: params });
    }
}