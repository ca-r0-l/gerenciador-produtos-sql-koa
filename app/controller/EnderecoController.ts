import * as Koa from "koa";
import * as Router from "koa-router";
import Response from "../entity/Response";
import EnderecoService from "../service/EnderecoService";

const enderecoService: EnderecoService = new EnderecoService();

const routerOpts: Router.IRouterOptions = {
   prefix: "/enderecos"
};

const enderecoController: Router = new Router(routerOpts);
enderecoController
   .get("/", async (ctx: Koa.Context) => {
      try {
         const pageNumber: number = ctx.request.query.pageNumber;
         const result: Response = await enderecoService.getAllPaginated(pageNumber);
         ctx.body = result.data;
         ctx.status = result.code;
      } catch (err) {
         ctx.throw(500, err.message);
      }
   })
   .post("/", async (ctx: any) => {
      const endereco = ctx.request.body;
      const result: Response = await enderecoService.add(endereco);
      ctx.body = result.data;
      ctx.status = result.code;
   })
   .delete("/:id", async (ctx: any) => {
      const id: number = ctx.params.id;
      const result: Response = await enderecoService.delete(id);
      ctx.body = result.data;
      ctx.status = result.code;
   })
   .put("/rua/:id", async (ctx: any) => {
      const id: number = ctx.params.id;
      const rua = ctx.request.body.rua;
      const result: Response = await enderecoService.updateRua(id, rua);
      ctx.body = result.data;
      ctx.status = result.code;
   })
   .put("/numero/:id", async (ctx: any) => {
      const id: number = ctx.params.id;
      const numero = ctx.request.body.numero;
      const result: Response = await enderecoService.updateNumero(id, numero);
      ctx.body = result.data;
      ctx.status = result.code;
   })
   .put("/bairro/:id", async (ctx: any) => {
      const id: number = ctx.params.id;
      const bairro = ctx.request.body.bairro;
      const result: Response = await enderecoService.updateBairro(id, bairro);
      ctx.body = result.data;
      ctx.status = result.code;
   })
   .put("/cidade/:id", async (ctx: any) => {
      const id: number = ctx.params.id;
      const cidade = ctx.request.body.cidade;
      const result: Response = await enderecoService.updateCidade(id, cidade);
      ctx.body = result.data;
      ctx.status = result.code;
   })
   .put("/estado/:id", async (ctx: any) => {
      const id: number = ctx.params.id;
      const estado = ctx.request.body.estado;
      const result: Response = await enderecoService.updateEstado(id, estado);
      ctx.body = result.data;
      ctx.status = result.code;
   });

export default enderecoController;
