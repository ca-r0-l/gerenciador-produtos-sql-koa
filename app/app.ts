import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as json from 'koa-json';
import routerController from './controller/ProdutosController';

const app = new Koa();
app.use(async (ctx, next) => {
   try {
      await next()

      if (ctx.status === 404) ctx.throw(404)
   } catch (err) {
      console.error(err)
      ctx.status = err.status || 500
      ctx.body = err.message
   }
});

app.use(json());
app.use(bodyParser());
app.use(routerController.routes());
app.use(routerController.allowedMethods());

export default app;