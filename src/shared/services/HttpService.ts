import axios from "axios";

export class HttpService {

    url: string = process.env.NEXT_PUBLIC_API_URL as string;

    post(path: string, bodyData?: any, params?: any) {
        axios.post(`${this.url}/${path}`, bodyData, { params: params })
            .then(result => {
                console.log(result)
            })
            .catch(error => {
                console.log(error);
            });
    }
}