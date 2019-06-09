import Produto from "./Produto";

export default class Response {
    public code: number;
    public data: Produto[];

    constructor(code: number, data?: any[]) {
        this.code = code;
        if (data) this.data = data;
    }
}