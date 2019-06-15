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
      try {
         const pageNumber: number = ctx.request.query.pageNumber;
         const result: Response = await categoriaService.getAllPaginated(pageNumber);
         ctx.body = result.data;
         ctx.status = result.code;
      } catch (err) {
         ctx.throw(500, err.message);
      }
   })
   .post("/", async (ctx: any) => {
      const categoria = ctx.request.body;
      const result: Response = await categoriaService.add(categoria);
      ctx.body = result.data;
      ctx.status = result.code;
   })
   .delete("/:id", async (ctx: any) => {
      const id: number = ctx.params.id;
      const result: Response = await categoriaService.delete(id);
      ctx.body = result.data;
      ctx.status = result.code;
   })
   .put("/nome/:id", async (ctx: any) => {
      const id: number = ctx.params.id;
      const categoria = ctx.request.body.nome;
      const result: Response = await categoriaService.updateNome(id, categoria);
      ctx.body = result.data;
      ctx.status = result.code;
   });

export default categoriaController;
