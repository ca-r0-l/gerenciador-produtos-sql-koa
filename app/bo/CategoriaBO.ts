import Categoria from "../entity/Categoria";

export default class ClienteBO {
   public static readonly ID_INVALIDO: string = "Id inválido";
   public static readonly NOME_INVALIDO: string = "Nome inválido";

   validId(id: any): void {
      if (!id || (id && id <= 0)) {
         throw new Error(ClienteBO.ID_INVALIDO);
      }
   }

   validNome(nome: string): void {
      if (!nome || (nome && nome.trim().length === 0)) {
         throw new Error(ClienteBO.NOME_INVALIDO);
      }
   }

   validCategoria(categoria: Categoria): void {
      this.validNome(categoria.nome);
   }
}
