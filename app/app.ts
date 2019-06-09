import * as Koa from 'koa';
import routerController from './controller/ProdutosController';

const app = new Koa();

app.use(routerController.routes());
app.use(routerController.allowedMethods());

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

// Application error logging.
app.on('error', console.error);

export default app;



