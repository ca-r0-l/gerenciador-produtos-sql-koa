// import * as Koa from "koa";
// import * as Router from "koa-router";
// import Response from "../entity/Response";

// const clientesService = new ClientesService();

// const routerOpts: Router.IRouterOptions = {
//    prefix: "/categorias"
// };

// const clientesController: Router = new Router(routerOpts);
// const clientesBO = new ClientesBO();

// clientesController
//    .get("/", async (ctx: Koa.Context) => {
//       try {
//          const result: Response = await categoriasService.getAll();
//          ctx.body = result.data;
//          ctx.status = result.code;
//       } catch (err) {
//          ctx.throw(500, err.message);
//       }
//    })
//    .post("/", async (ctx: any) => {
//       const categoria: Categoria = ctx.request.body;
//       categoriaBO.validCategoria(categoria);
//       const result: Response = await categoriasService.add(categoria);
//       ctx.body = result.data;
//       ctx.status = result.code;
//    })
//    .delete("/:id", async (ctx: any) => {
//       const id: number = ctx.params.id;
//       categoriaBO.validId(id);
//       const result: Response = await categoriasService.delete(id);
//       ctx.body = result.data;
//       ctx.status = result.code;
//    })
//    .put("/:id", async (ctx: any) => {
//       const id: number = ctx.params.id;
//       categoriaBO.validId(id);
//       const nome: string = ctx.request.body.nome;
//       categoriaBO.validNome(nome);
//       const result: Response = await categoriasService.updateNome(id, nome);
//       ctx.body = result.data;
//       ctx.status = result.code;
//    });

// export default clientesController;
