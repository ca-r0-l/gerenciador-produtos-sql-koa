export default class Produto {
    public id: number;
    public nome: string;
    public preco_unitario: number;
    public categoria: number;

    constructor(
            nome: string,
            preco_unitario: number,
            categoria: number,
            id?: number
        ) {
            this.nome = nome;
            this.preco_unitario = preco_unitario;
            this.categoria = categoria;
            if (id) this.id = id;
    }

}