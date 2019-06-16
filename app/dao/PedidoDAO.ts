import connection from "../dbConnection";
import Pedido from "../entity/Pedido";

export default class PedidoDAO {
   private PER_PAGE: number = 5;

   public async getAllPaginated(pageNumber): Promise<any> {
      try {
         const pool = await connection;
         const result = await pool.request().query(`
            SELECT p.id idPedido, p.valor_compra valor, c.id idCliente, c.nome, 
            c.endereco, c.celular,
            e.id idEndereco, e.rua, e.numero,
               e.estado, e.cidade, e.bairro
                  FROM pedidos p
                  LEFT JOIN clientes c ON
                  p.id_cliente = c.id
                  LEFT JOIN enderecos e ON c.endereco = e.id
                  ORDER BY p.id
                  OFFSET ${this.PER_PAGE} * (${pageNumber} - 1) ROWS
                  FETCH NEXT ${this.PER_PAGE} ROWS ONLY;
                  `);
         return result.recordset;
      } catch (err) {
         console.log("PedidoService file: ", err);
         return err;
      }
   }

   public async add(pedido: Pedido): Promise<any> {
      try {
         const pool = await connection;
         const result = await pool
            .request()
            .input("id_cliente", pedido.cliente)
            .input("valor_compra", pedido.valorCompra)
            .query("insert into pedidos (id_cliente, valor_compra) values (@id_cliente, @valor_compra);");
         return result.recordset;
      } catch (err) {
         console.log("PedidoService file: ", err);
         return err;
      }
   }

   public async delete(id: number): Promise<any> {
      try {
         const pool = await connection;
         const result = await pool
            .request()
            .input("id", id)
            .query("delete from pedidos where id = @id;");
         return result.recordset;
      } catch (err) {
         console.log("PedidoService file: ", err);
         return err;
      }
   }

   public async updateCliente(id: number, cliente: number): Promise<any> {
      try {
         const pool = await connection;
         const result = await pool
            .request()
            .input("id", id)
            .input("id_cliente", cliente)
            .query("update pedidos set id_cliente = @id_cliente where id = @id;");
         return result.recordset;
      } catch (err) {
         console.log("PedidoService file: ", err);
         return err;
      }
   }

   public async updateValor(id: number, valor: number): Promise<any> {
      try {
         const pool = await connection;
         const result = await pool
            .request()
            .input("id", id)
            .input("valor_compra", valor)
            .query("update pedidos set valor_compra = @valor_compra where id = @id;");
         return result.recordset;
      } catch (err) {
         console.log("PedidoService file: ", err);
         return err;
      }
   }
}
