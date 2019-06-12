import * as Koa from "koa";
import * as Router from "koa-router";
import Response from "../entity/Response";
import CategoriaBO from "../bo/CategoriaBO";
import CategoriasService from "../service/CategoriasService";
import Categoria from "../entity/Categoria";

const categoriasService = new CategoriasService();

const routerOpts: Router.IRouterOptions = {
   prefix: "/categorias"
};

const routerController: Router = new Router(routerOpts);
const categoriaBO = new CategoriaBO();

routerController
   .get("/", async (ctx: Koa.Context) => {
      try {
         const result: Response = await categoriasService.getAll();
         ctx.body = result.data;
         ctx.status = result.code;
      } catch (err) {
         ctx.throw(500, err.message);
      }
   })
   .post("/", async (ctx: any) => {
      const categoria: Categoria = ctx.request.body;
      categoriaBO.validCategoria(categoria);
      const result: Response = await categoriasService.add(categoria);
      ctx.body = result.data;
      ctx.status = result.code;
   })
   .delete("/:id", async (ctx: any) => {
      const id: number = ctx.params.id;
      categoriaBO.validId(id);
      const result: Response = await categoriasService.delete(id);
      ctx.body = result.data;
      ctx.status = result.code;
   })
   .put("/:id", async (ctx: any) => {
      const id: number = ctx.params.id;
      categoriaBO.validId(id);
      const nome: string = ctx.request.body.nome;
      categoriaBO.validNome(nome);
      const result: Response = await categoriasService.updateNome(id, nome);
      ctx.body = result.data;
      ctx.status = result.code;
   });

export default routerController;
