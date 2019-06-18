import connection from "../dbConnection";
import Produto from "../entity/Produto";
import * as sql from "mssql";

export default class ProdutoPedidoDAO {
   private PER_PAGE: number = 5;

   public async getAllPaginated(pageNumber): Promise<any> {
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
         return result.recordset;
      } catch (err) {
         console.log("ProdutoService file: ", err);
         return err;
      }
   }

   public async add(produtos: Array<Produto>, idPedido: number): Promise<any> {
      try {
         const table = new sql.Table("pedidos_produtos");
         table.create = true;
         table.columns.add("id_produto", sql.Int, { nullable: false });
         table.columns.add("id_pedido", sql.Int, { nullable: false, primary: true });
         produtos.forEach(p => table.rows.add(p.id, idPedido));

         console.log(idPedido);
         console.log(table);

         const pool = await connection;
         const result = await pool.request().bulk(table);
         return result.recordset;
      } catch (err) {
         console.log("ProdutoService file: ", err);
         return err;
      }
   }
}
