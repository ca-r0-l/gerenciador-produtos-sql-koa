import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as json from 'koa-json';
import routerController from './controller/ProdutosController';

const app = new Koa();

// Generic error handling middleware.
app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
  try {
    await next();
  } catch (error) {
    ctx.status = error.statusCode || error.status;
    error.status = ctx.status;
    ctx.body = { error };
    ctx.app.emit('error', error, ctx);
  }
});
app.use(json());
app.use(bodyParser());
app.use(routerController.routes());
app.use(routerController.allowedMethods());
// Application error logging.
app.on('error', console.error);

export default app;



