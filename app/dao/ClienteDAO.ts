import connection from "../dbConnection";
import Cliente from "../entity/Cliente";

export default class ClienteDAO {
   private PER_PAGE: number = 5;

   public async getAllPaginated(pageNumber): Promise<any> {
      const pool = await connection;
      const result = await pool.request().query(`
         SELECT c.id idCliente, c.nome, 
            c.endereco, c.celular, 
            e.id idEndereco, e.rua, e.numero,
            e.estado, e.cidade, e.bairro
            FROM clientes c
            LEFT JOIN enderecos e ON c.endereco = e.id
               ORDER BY c.id
               OFFSET ${this.PER_PAGE} * (${pageNumber} - 1) ROWS
               FETCH NEXT ${this.PER_PAGE} ROWS ONLY;
         `);
      return result.recordset;
   }

   public async add(cliente: Cliente): Promise<any> {
      const pool = await connection;
      const result = await pool
         .request()
         .input("nome", cliente.nome)
         .input("endereco", cliente.endereco)
         .input("celular", cliente.celular)
         .query("insert into clientes (nome, endereco, celular) values (@nome, @endereco, @celular);");
      return result.recordset;
   }

   public async delete(id: number): Promise<any> {
      const pool = await connection;
      const result = await pool
         .request()
         .input("id", id)
         .query("delete from clientes where id = @id;");
      return result.recordset;
   }

   public async updateNome(id: number, nome: string): Promise<any> {
      const pool = await connection;
      const result = await pool
         .request()
         .input("id", id)
         .input("nome", nome)
         .query("update clientes set nome = @nome where id = @id;");
      return result.recordset;
   }

   public async updateEndereco(id: number, endereco: number): Promise<any> {
      const pool = await connection;
      const result = await pool
         .request()
         .input("id", id)
         .input("endereco", endereco)
         .query("update clientes set endereco = @endereco where id = @id;");
      return result.recordset;
   }

   public async updateCelular(id: number, celular: string): Promise<any> {
      const pool = await connection;
      const result = await pool
         .request()
         .input("id", id)
         .input("celular", celular)
         .query("update clientes set celular = @celular where id = @id;");
      return result.recordset;
   }
}
