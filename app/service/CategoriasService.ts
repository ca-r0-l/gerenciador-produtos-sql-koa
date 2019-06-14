import connection from "../dbConnection";
import Response from "../entity/Response";
import Categoria from "../entity/Categoria";

export default class CategoriasService {
   private PER_PAGE: number = 5;

   public async getAllPaginated(pageNumber): Promise<Response> {
      try {
         const pool = await connection;
         const result = await pool.request().query(`
            SELECT * 
               FROM categorias
               ORDER BY categorias.id
               OFFSET ${this.PER_PAGE} * (${pageNumber} - 1) ROWS
               FETCH NEXT ${this.PER_PAGE} ROWS ONLY;
         `);
         return new Response(200, this.createCategoria(result.recordset));
      } catch (err) {
         console.log("CategoriasService file: ", err);
         return new Response(500);
      }
   }

   public async add(categoria: Categoria): Promise<Response> {
      try {
         const pool = await connection;
         const result = await pool
            .request()
            .input("nome", categoria.nome)
            .query("insert into categorias (nome) values (@nome);");
         return new Response(200, this.createCategoria(result.recordset));
      } catch (err) {
         console.log("CategoriasService file: ", err);
         return new Response(500);
      }
   }

   public async delete(id: number): Promise<Response> {
      try {
         const pool = await connection;
         const result = await pool
            .request()
            .input("id", id)
            .query("delete from categorias where id = @id;");
         return new Response(200, this.createCategoria(result.recordset));
      } catch (err) {
         console.log("CategoriasService file: ", err);
         return new Response(500);
      }
   }

   public async update(id: number, categoria: Categoria): Promise<Response> {
      try {
         const pool = await connection;
         const result = await pool
            .request()
            .input("id", id)
            .input("nome", categoria.nome)
            .query("update categorias set nome = @nome where id = @id;");
         return new Response(200, this.createCategoria(result.recordset));
      } catch (err) {
         console.log("CategoriasService file: ", err);
         return new Response(500);
      }
   }

   private createCategoria(categoria): Array<Categoria> {
      const categorias = new Array<Categoria>();
      if (categoria && categoria.length) {
         categoria.forEach(c => categorias.push(new Categoria(c["nome"], c["id"])));
      }

      return categorias;
   }
}
