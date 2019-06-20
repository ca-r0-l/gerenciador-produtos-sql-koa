import connection from "../dbConnection";

export default class ProdutoPedidoDAO {
   private PER_PAGE: number = 5;

   public async getAllPaginated(pageNumber): Promise<any> {
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
   }
}
