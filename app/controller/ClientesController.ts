import * as Koa from "koa";
import * as Router from "koa-router";
import Response from "../entity/Response";
import ClientesService from "../service/ClientesService";
import ClientesBO from "../bo/ClientesBO";
import Cliente from "../entity/Cliente";

const clientesService = new ClientesService();

const routerOpts: Router.IRouterOptions = {
   prefix: "/categorias"
};

const clientesController: Router = new Router(routerOpts);
const clientesBO = new ClientesBO();

clientesController
   .get("/", async (ctx: Koa.Context) => {
      try {
         const pageNumber = ctx.request.query.pageNumber;
         const result: Response = await clientesService.getAll(pageNumber);
         ctx.body = result.data;
         ctx.status = result.code;
      } catch (err) {
         ctx.throw(500, err.message);
      }
   })
   .post("/", async (ctx: any) => {
      const cliente: Cliente = ctx.request.body;
      clientesBO.validCliente(cliente);
      const result: Response = await clientesService.add(cliente);
      ctx.body = result.data;
      ctx.status = result.code;
   })
   .delete("/:id", async (ctx: any) => {
      const id: number = ctx.params.id;
      clientesBO.validId(id);
      const result: Response = await clientesService.delete(id);
      ctx.body = result.data;
      ctx.status = result.code;
   })
   .put("/:id", async (ctx: any) => {
      const id: number = ctx.params.id;
      clientesBO.validId(id);
      const cliente = ctx.request.body;
      clientesBO.validCliente(cliente);
      const result: Response = await clientesService.update(id, cliente);
      ctx.body = result.data;
      ctx.status = result.code;
   });

export default clientesController;
