export default class PedidoBO {
   private static readonly ID_INVALIDO: string = "Id inválido";
   private static readonly CLIENTE_INVALIDO: string = "Cliente inválido";
   private static readonly VALOR_INVALIDO: string = "Valor inválido";

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

   validPedido(pedido): void {
      this.validCliente(pedido.idCliente);
      this.validValor(pedido.valorCompra);
   }
}
