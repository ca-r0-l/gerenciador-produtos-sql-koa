import Response from "../entity/Response";
import ProdutoPedidoDAO from "../dao/ProdutoPedidoDAO";
import Produto from "../entity/Produto";
export default class PedidoProdutoService {
   private _produtoPedidoDAO: ProdutoPedidoDAO;

   constructor() {
      this._produtoPedidoDAO = new ProdutoPedidoDAO();
   }

   public async getAllPaginated(pageNumber): Promise<Response> {
      const result = await this._produtoPedidoDAO.getAllPaginated(pageNumber);
      return new Response(200, result);
   }

   public async add(produtos: Array<Produto>, idPedido: number): Promise<Response> {
      const result = await this._produtoPedidoDAO.add(produtos, idPedido);
      return new Response(200, result);
   }
}
