import * as Koa from 'koa';
import * as Router from 'koa-router';
import ProdutosService from '../service/ProdutosService';
import Response from '../entity/Response';
import ProdutosBO from '../BO/ProdutosBO';
import Produto from '../entity/Produto';

const produtosService = new ProdutosService();

const routerOpts: Router.IRouterOptions = {
   prefix: '/produtos',
};

const routerController: Router = new Router(routerOpts);
const produtosBO = new ProdutosBO();

routerController
   .get('/', async (ctx: Koa.Context) => {
      try {
         const result: Response = await produtosService.getAll();
         ctx.body = result.data;
         ctx.status = result.code;
      } catch (err) {
         ctx.throw(500, err.message);
      }
   })
   .post('/', async (ctx: any) => {
      const produto: Produto = ctx.request.body;
      produtosBO.validProduto(produto);
      const result: Response = await produtosService.add(produto);
      ctx.body = result.data;
      ctx.status = result.code;
   })
   .delete('/:id', async (ctx: any) => {
      const id: number = ctx.params.id;
      produtosBO.validId(id);
      const result: Response = await produtosService.delete(id);
      ctx.body = result.data;
      ctx.status = result.code;
   })
   .put('/:id', async (ctx: any) => {
      const id: number = ctx.params.id;
      const produto: Produto = ctx.request.body;
      produtosBO.validProduto(produto);
      produtosBO.validId(id);
      const result: Response = await produtosService.update(id, produto);
      ctx.body = result.data;
      ctx.status = result.code;
   });

export default routerController;