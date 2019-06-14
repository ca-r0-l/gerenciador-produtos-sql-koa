import connection from "../dbConnection";
import Response from "../entity/Response";
import Cliente from "../entity/Cliente";

export default class ClientesService {
   private PER_PAGE: number = 5;

   public async getAll(pageNumber): Promise<Response> {
      try {
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
         return new Response(200, this.createCategoria(result.recordset));
      } catch (err) {
         console.log("ClientesService file: ", err);
         return new Response(500);
      }
   }

   public async add(cliente: Cliente): Promise<Response> {
      try {
         const pool = await connection;
         const result = await pool
            .request()
            .input("nome", cliente.nome)
            .input("endereco", cliente.endereco)
            .input("celular", cliente.celular)
            .query("insert into clientes (nome, endereco, celular) values (@nome, @endereco, @celular);");
         return new Response(200, this.createCategoria(result.recordset));
      } catch (err) {
         console.log("ClientesService file: ", err);
         return new Response(500);
      }
   }

   public async delete(id: number): Promise<Response> {
      try {
         const pool = await connection;
         const result = await pool
            .request()
            .input("id", id)
            .query("delete from clientes where id = @id;");
         return new Response(200, this.createCategoria(result.recordset));
      } catch (err) {
         console.log("ClientesService file: ", err);
         return new Response(500);
      }
   }

   public async update(id: number, cliente: Cliente): Promise<Response> {
      try {
         const pool = await connection;
         const result = await pool
            .request()
            .input("id", id)
            .input("nome", cliente.nome)
            .input("endereco", cliente.endereco)
            .input("celular", cliente.celular)
            .query("update clientes set nome = @nome, endereco = @endereco, celular = @celular where id = @id;");
         return new Response(200, this.createCategoria(result.recordset));
      } catch (err) {
         console.log("ClientesService file: ", err);
         return new Response(500);
      }
   }

   private createCategoria(cliente): Array<Cliente> {
      const clientes = new Array<Cliente>();
      if (cliente && cliente.length) {
         cliente.forEach(c => clientes.push(new Cliente(c["nome"], c["endereco"], c["celular"], c["idCliente"])));
      }

      return clientes;
   }
}
