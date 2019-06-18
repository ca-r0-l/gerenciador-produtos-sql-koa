export default class ProdutoBO {
   private static readonly ID_INVALIDO: string = "Id inválido";
   private static readonly NOME_INVALIDO: string = "Nome inválido";
   private static readonly PRECO_UNITARIO_INVALIDO: string = "Preço unitário inválido";
   private static readonly CATEGORIA_INVALIDO: string = "Categoria inválido";

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

   validCategoria(categoria: number): void {
      if (!categoria || ((categoria && typeof categoria !== "number") || categoria <= 0)) {
         throw new Error(ProdutoBO.CATEGORIA_INVALIDO);
      }
   }

   validProduto(produto): void {
      this.validNome(produto.nome);
      this.validPreco(produto.preco_unitario);
      this.validCategoria(produto.categoria);
   }
}
