import * as Koa from 'koa';
import * as Router from 'koa-router';
import ProdutosService from '../service/ProdutosService';
import Response from '../entity/Response';

const produtosService = new ProdutosService();

const routerOpts: Router.IRouterOptions = {
    prefix: '/produtos',
  };
  
const routerController: Router = new Router(routerOpts);

routerController.get('/', async (ctx:Koa.Context) => {
    const result: Response = await produtosService.getAll();
    ctx.body = result.data;
    ctx.status = result.code;
  });
  
export default routerController;


