import Produto from "../entity/Produto";
export default class PedidoBO {
   private static readonly ID_INVALIDO: string = "Id inválido";
   private static readonly CLIENTE_INVALIDO: string = "Cliente inválido";
   private static readonly VALOR_INVALIDO: string = "Valor inválido";
   private static readonly PRODUTOS_INVALIDOS: string = "Pedidos inválidos. Necessário pelo menos 1.";

   validId(id: any): void {
      if (!id || (id && id <= 0)) {
         throw new Error(PedidoBO.ID_INVALIDO);
      }
   }

   validCliente(cliente: number): void {
      if (!cliente || (cliente && cliente <= 0)) {
         throw new Error(PedidoBO.CLIENTE_INVALIDO);
      }
   }

   validValor(valor: number): void {
      if (!valor || (valor && valor <= 0)) {
         throw new Error(PedidoBO.VALOR_INVALIDO);
      }
   }

   validProdutos(produtos: Array<Produto>): void {
      if (!produtos || (produtos && produtos.length === 0)) {
         throw new Error(PedidoBO.PRODUTOS_INVALIDOS);
      }
   }

   validPedido(pedido): void {
      this.validCliente(pedido.cliente);
      this.validValor(pedido.valorCompra);
      this.validProdutos(pedido.produtos);
   }
}
