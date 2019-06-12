import connection from "../dbConnection";
import Response from "../entity/Response";
import Categoria from "../entity/Categoria";

export default class CategoriasService {
   public async getAll(): Promise<Response> {
      try {
         const pool = await connection;
         const result = await pool.request().query("select * from categorias;");
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

   public async updateNome(id: number, nome: string): Promise<Response> {
      try {
         const pool = await connection;
         const result = await pool
            .request()
            .input("id", id)
            .input("nome", nome)
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
