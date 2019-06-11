import Produto from '../entity/Produto';

export default class ProdutosBO {
    private static readonly ID_INVALIDO: string = 'Id inválido';
    private static readonly NOME_INVALIDO: string = 'Nome inválido';
    private static readonly PRECO_UNITARIO_INVALIDO: string = 'Preço unitário inválido';
    private static readonly CATEGORIA_INVALIDO: string = 'Categoria inválido';

    validId(id: any): void {
        if (!id
        || typeof id !== 'number'
        || id <= 0) {
            throw new Error(ProdutosBO.ID_INVALIDO);
        }
    }

    validProduto(produto: Produto): void {
        if (!produto.nome 
        || produto.nome.trim().length === 0) {
            throw new Error(ProdutosBO.NOME_INVALIDO);
        }

        if (!produto.preco_unitario 
        || typeof produto.preco_unitario !== 'number'
        || produto.preco_unitario <= 0) {
            throw new Error(ProdutosBO.PRECO_UNITARIO_INVALIDO);
        }

        if (!produto.categoria 
        || typeof produto.categoria !== 'number'
        || produto.categoria <= 0) {
            throw new Error(ProdutosBO.CATEGORIA_INVALIDO);
        }
    }

}