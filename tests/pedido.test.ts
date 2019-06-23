import "jasmine";
import PedidoBO from "../app/bo/PedidoBO";
import Pedido from "../app/entity/Pedido";
import Cliente from "../app/entity/Cliente";
import Endereco from "../app/entity/Endereco";
import Produto from "../app/entity/Produto";
import Categoria from "../app/entity/Categoria";
import ClienteBO from "../app/bo/ClienteBO";

describe("PedidoBO =>", () => {
   const pedidoBO = new PedidoBO();
   let pedido: Pedido;
   beforeEach(() => {
      pedido = new Pedido(new Cliente("carol", new Endereco("urca", 111, "independencia", "sbc", "SP"), "123456789", 1), 100.9, [
         new Produto("coxinha", 10.9, new Categoria("salgado"), 1)
      ]);
   });

   it("pedido válido, não retornará erro", () => {
      expect(() => {
         pedidoBO.validPedido(pedido);
      }).not.toThrow();
   });

   it("cliente inválido, erro: CLIENTE_INVALIDO", () => {
      delete pedido.cliente;
      expect(() => {
         pedidoBO.validPedido(pedido);
      }).toThrowError(ClienteBO.CLIENTE_INVALIDO);
   });

   it("produto inválido, erro: PRODUTOS_INVALIDOS", () => {
      pedido.produtos = [];
      expect(() => {
         pedidoBO.validPedido(pedido);
      }).toThrowError(PedidoBO.PRODUTOS_INVALIDOS);
   });
});
