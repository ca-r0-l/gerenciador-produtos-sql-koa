import Cliente from "./Cliente";

export default class Pedido {
   public id?: number;
   public cliente: Cliente;
   public valorCompra: number;

   constructor(idCliente: Cliente, valorCompra: number, id?: number) {
      if (id) this.id = id;
      this.cliente = idCliente;
      this.valorCompra = valorCompra;
   }
}
