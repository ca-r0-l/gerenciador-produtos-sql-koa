import * as Koa from "koa";
import * as Router from "koa-router";
import Response from "../entity/Response";
import CategoriaService from "../service/CategoriaService";

const categoriaService = new CategoriaService();

const routerOpts: Router.IRouterOptions = {
   prefix: "/categorias"
};

const categoriaController: Router = new Router(routerOpts);
categoriaController
   .get("/", async (ctx: Koa.Context) => {
      const pageNumber: number = ctx.request.query.pageNumber;
      const result: Response = await categoriaService.getAllPaginated(pageNumber);
      ctx.body = result.data;
      ctx.status = result.code;
   })
   .get("/:id", async (ctx: Koa.Context) => {
      const id: number = ctx.params.id;
      const result: Response = await categoriaService.detail(id);
      ctx.body = result.data;
      ctx.status = result.code;
   })
   .post("/", async (ctx: any) => {
      const categoria = ctx.request.body;
      const result: Response = await categoriaService.add(categoria);
      ctx.body = result.data;
      ctx.status = result.code;
   })
   .delete("/:id", async (ctx: Koa.Context) => {
      const id: number = ctx.params.id;
      const result: Response = await categoriaService.delete(id);
      ctx.body = result.data;
      ctx.status = result.code;
   })
   .put("/:id/nome", async (ctx: any) => {
      const id: number = ctx.params.id;
      const nome = ctx.request.body.nome;
      const result: Response = await categoriaService.updateNome(id, nome);
      ctx.body = result.data;
      ctx.status = result.code;
   });

export default categoriaController;
