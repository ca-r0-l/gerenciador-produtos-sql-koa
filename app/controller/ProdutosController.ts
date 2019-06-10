import * as Koa from 'koa';
import * as Router from 'koa-router';
import ProdutosService from '../service/ProdutosService';
import Response from '../entity/Response';

const produtosService = new ProdutosService();

const routerOpts: Router.IRouterOptions = {
    prefix: '/produtos',
  };
  
const routerController: Router = new Router(routerOpts);

routerController
  .get('/', async (ctx:Koa.Context) => {
    console.log('Buscando todos os produtos.');
    const result: Response = await produtosService.getAll();
    ctx.body = result.data;
    ctx.status = result.code;
  })
  .post('/', async (ctx:any) => {
    console.log('Adicionando um novo produto.');
    const result: Response = await produtosService.add(ctx.request.body);
    ctx.body = result.data;
    ctx.status = result.code;
  })
  .delete('/:id', async (ctx:any) => {
    console.log('Deletando um produto.');
    const result: Response = await produtosService.delete(ctx.params.id);
    ctx.body = result.data;
    ctx.status = result.code;
  }) 
  .put('/:id', async (ctx:any) => {
    console.log('Atualizando um produto.');
    const result: Response = await produtosService.update(ctx.params.id, ctx.request.body);
    ctx.body = result.data;
    ctx.status = result.code;
  });
  
export default routerController;


