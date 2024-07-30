import axios from "axios";

export class HttpService {

    url: string = process.env.NEXT_PUBLIC_API_URL as string;

    post(path: string, bodyData: any) {
        axios.post(`${this.url}/${path}`, bodyData)
            .then(result => {
                console.log(result)
            })
            .catch(error => {
                console.log(error);
            });
    }
}