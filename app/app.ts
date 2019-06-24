import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as json from "koa-json";
import produtoController from "./src/controller/ProdutoController";
import categoriaController from "./src/controller/CategoriaController";
import clienteController from "./src/controller/ClienteController";
import enderecoController from "./src/controller/EnderecoController";
import pedidoController from "./src/controller/PedidoController";

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

app.use(enderecoController.routes());
app.use(enderecoController.allowedMethods());

app.use(pedidoController.routes());
app.use(pedidoController.allowedMethods());

export default app;
