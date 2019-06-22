import Categoria from "../entity/Categoria";
export default class ProdutoBO {
   public static readonly ID_INVALIDO: string = "Id inválido";
   public static readonly NOME_INVALIDO: string = "Nome inválido";
   public static readonly PRECO_UNITARIO_INVALIDO: string = "Preço unitário inválido";
   public static readonly CATEGORIA_INVALIDA: string = "Categoria inválida";

   validId(id: any): void {
      if (!id || (id && id <= 0)) {
         throw new Error(ProdutoBO.ID_INVALIDO);
      }
   }

   validNome(nome?: string): void {
      if (!nome || (nome && nome.trim().length === 0)) {
         throw new Error(ProdutoBO.NOME_INVALIDO);
      }
   }

   validPreco(preco: number): void {
      if (!preco || ((preco && typeof preco !== "number") || preco <= 0)) {
         throw new Error(ProdutoBO.PRECO_UNITARIO_INVALIDO);
      }
   }

   validCategoria(categoria: number | Categoria): void {
      if (categoria) {
         if (typeof categoria === "number") {
            if (categoria <= 0) {
               throw new Error(ProdutoBO.CATEGORIA_INVALIDA);
            }
         } else {
            if (!categoria.nome || categoria.nome === "") {
               throw new Error(ProdutoBO.CATEGORIA_INVALIDA);
            }
         }
      } else {
         throw new Error(ProdutoBO.CATEGORIA_INVALIDA);
      }
   }

   validProduto(produto): void {
      this.validNome(produto.nome);
      this.validPreco(produto.preco_unitario);
      this.validCategoria(produto.categoria);
   }
}
