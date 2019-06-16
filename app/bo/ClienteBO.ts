export default class ClienteBO {
   private static readonly ID_INVALIDO: string = "Id inválido";
   private static readonly NOME_INVALIDO: string = "Nome inválido";
   private static readonly CELULAR_INVALIDO: string = "Celular inválido";

   public validId(id?: any): void {
      if (!id || (id && id <= 0)) {
         throw new Error(ClienteBO.ID_INVALIDO);
      }
   }

   public validNome(nome?: any): void {
      if (!nome || (nome && nome.trim().length === 0)) {
         throw new Error(ClienteBO.NOME_INVALIDO);
      }
   }

   public validCelular(celular?: string): void {
      if (!celular || (celular && celular.trim().length !== 9) || (celular && !Number.parseInt(celular))) {
         throw new Error(ClienteBO.CELULAR_INVALIDO);
      }
   }

   public validEndereco(endereco?: number): void {
      if (!endereco || (endereco && endereco <= 0)) {
         throw new Error(ClienteBO.ID_INVALIDO);
      }
   }

   public validCliente(cliente): void {
      this.validNome(cliente.nome);
      this.validCelular(cliente.celular);
      this.validEndereco(cliente.endereco);
   }
}
