import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as json from "koa-json";
import produtoController from "./controller/ProdutoController";
import categoriaController from "./controller/CategoriaController";
import clienteController from "./controller/ClienteController";

const app = new Koa();
app.use(async (ctx, next) => {
   try {
      await next();

      if (ctx.status === 404) ctx.throw(404);
   } catch (err) {
      console.error(err);
      ctx.status = err.status || 500;
      ctx.body = err.message;
   }
});

app.use(json());
app.use(bodyParser());

app.use(produtoController.routes());
app.use(produtoController.allowedMethods());

app.use(categoriaController.routes());
app.use(categoriaController.allowedMethods());

app.use(clienteController.routes());
app.use(clienteController.allowedMethods());

export default app;
