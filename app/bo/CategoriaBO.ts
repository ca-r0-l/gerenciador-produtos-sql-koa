import Categoria from "../entity/Categoria";

export default class CategoriaBO {
   private static readonly ID_INVALIDO: string = "Id inválido";
   private static readonly NOME_INVALIDO: string = "Nome inválido";

   validId(id: any): void {
      if (!id || id <= 0) {
         throw new Error(CategoriaBO.ID_INVALIDO);
      }
   }

   validNome(nome: string): void {
      if (!nome || nome.trim().length === 0) {
         throw new Error(CategoriaBO.NOME_INVALIDO);
      }
   }

   validCategoria(categoria: Categoria): void {
      this.validNome(categoria.nome);
   }
}
