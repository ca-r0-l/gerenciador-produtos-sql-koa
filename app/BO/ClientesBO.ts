import Cliente from "../entity/Cliente";

export default class ClientesBO {
   private static readonly ID_INVALIDO: string = "Id inválido";
   private static readonly NOME_INVALIDO: string = "Nome inválido";
   private static readonly CELULAR_INVALIDO: string = "Celular inválido";

   validId(id: any): void {
      if (!id || id <= 0) {
         throw new Error(ClientesBO.ID_INVALIDO);
      }
   }

   validNome(cliente: Cliente): void {
      if (!cliente.nome || (cliente.nome && cliente.nome.trim().length === 0)) {
         throw new Error(ClientesBO.NOME_INVALIDO);
      }
   }

   validCelular(cliente: Cliente): void {
      if (!cliente.celular || (cliente.celular && cliente.celular.trim().length !== 9) || !Number.parseInt(cliente.celular)) {
         throw new Error(ClientesBO.CELULAR_INVALIDO);
      }
   }

   public validCliente(cliente: Cliente): void {
      this.validId(cliente);
      this.validNome(cliente);
      this.validCelular(cliente);
   }
}
