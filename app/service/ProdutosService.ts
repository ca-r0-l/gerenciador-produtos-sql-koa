import connection from "../dbConnection";
import Response from "../entity/Response";
import Produto from '../entity/Produto';

export default class ProdutosService {

    public async getAll(): Promise<Response> {
        try {
            const pool = await connection;
            const result = await pool.request()
                .query('select * from produtos;');
            return new Response(200, result.recordset);
        } catch (err) {
            console.log('ProdutosService file: ', err);
            return new Response(500);
          }
    }

    public async add(produto: Produto): Promise<Response> {
        try {
            const pool = await connection;
            const result = await pool.request()
                .input('nome', produto.nome)
                .input('preco_unitario', produto.preco_unitario)
                .input('categoria', produto.categoria)
                .query('insert into produtos (nome, preco_unitario, categoria) values (@nome, @preco_unitario, @categoria);');
            return new Response(200, result.rowsAffected);
        } catch (err) {
            console.log('ProdutosService file: ', err);
            return new Response(500);
          }
    }

    public async delete(id: number): Promise<Response> {
        try {
            const pool = await connection;
            const result = await pool.request()
                .input('id', id)
                .query('delete from produtos where id = @id;');
            return new Response(200, result.rowsAffected);
        } catch (err) {
            console.log('ProdutosService file: ', err);
            return new Response(500);
          }
    }

    public async update(id: number, produto: Produto): Promise<Response> {
        try {
            const pool = await connection;
            const result = await pool.request()
                .input('id', id)
                .input('nome', produto.nome)
                .input('preco_unitario', produto.preco_unitario)
                .input('categoria', produto.categoria)
                .query('updat   e produtos set nome = @nome, preco_unitario = @preco_unitario, categoria = @categoria where id = @id;');
            return new Response(200, result.rowsAffected);
        } catch (err) {
            console.log('ProdutosService file: ', err);
            return new Response(500);
          }
    }
}