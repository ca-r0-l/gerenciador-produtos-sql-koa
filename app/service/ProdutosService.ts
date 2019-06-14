import connection from "../dbConnection";
import Response from "../entity/Response";
import Produto from "../entity/Produto";
import * as Koa from "koa";
import Categoria from "../entity/Categoria";

export default class ProdutosService {
   private PER_PAGE: number = 5;

   public async getAll(pageNumber): Promise<Response> {
      try {
         const pool = await connection;
         const result = await pool.request().query(`
            SELECT p.id idProduto, p.nome, p.preco_unitario preco, c.id idCategoria, c.nome nomeCategoria
                  FROM produtos p
                  LEFT JOIN categorias c ON
                  p.categoria = c.id
                  ORDER BY p.id
                  OFFSET ${this.PER_PAGE} * (${pageNumber} - 1) ROWS
                  FETCH NEXT ${this.PER_PAGE} ROWS ONLY;
                  `);

         return new Response(200, this.createProduto(result.recordset));
      } catch (err) {
         console.log("ProdutosService file: ", err);
         return new Response(500);
      }
   }

   public async add(produto: Produto): Promise<Response> {
      try {
         const pool = await connection;
         const result = await pool
            .request()
            .input("nome", produto.nome)
            .input("preco_unitario", produto.preco_unitario)
            .input("categoria", produto.categoria)
            .query("insert into produtos (nome, preco_unitario, categoria) values (@nome, @preco_unitario, @categoria);");
         return new Response(200, this.createProduto(result.recordset));
      } catch (err) {
         console.log("ProdutosService file: ", err);
         return new Response(500);
      }
   }

   public async delete(id: number): Promise<Response> {
      try {
         const pool = await connection;
         const result = await pool
            .request()
            .input("id", id)
            .query("delete from produtos where id = @id;");
         return new Response(200, this.createProduto(result.recordset));
      } catch (err) {
         console.log("ProdutosService file: ", err);
         return new Response(500);
      }
   }

   public async update(id: number, produto: Produto): Promise<Response> {
      try {
         const pool = await connection;
         const result = await pool
            .request()
            .input("id", id)
            .input("nome", produto.nome)
            .input("preco_unitario", produto.preco_unitario)
            .input("categoria", produto.categoria)
            .query("update produtos set nome = @nome, preco_unitario = @preco_unitario, categoria = @categoria where id = @id;");
         return new Response(200, this.createProduto(result.recordset));
      } catch (err) {
         console.log("ProdutosService file: ", err);
         return new Response(500);
      }
   }

   private createProduto(produto): Array<Produto> {
      const produtos = new Array<Produto>();
      if (produto && produto.length) {
         produto.forEach(p => produtos.push(new Produto(p["nome"], p["preco"], new Categoria(p["nomeCategoria"], p["idCategoria"]), p["idProduto"])));
      }

      return produtos;
   }
}
