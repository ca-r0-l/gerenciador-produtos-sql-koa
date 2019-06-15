import Response from "../entity/Response";
import Categoria from "../entity/Categoria";
import CategoriaDAO from "../dao/CategoriaDAO";
import CategoriaBO from "../bo/CategoriaBO";

export default class CategoriaService {
   private _categoriaDAO: CategoriaDAO;
   private _categoriaBO: CategoriaBO;

   constructor() {
      this._categoriaBO = new CategoriaBO();
      this._categoriaDAO = new CategoriaDAO();
   }

   public async getAllPaginated(pageNumber): Promise<Response> {
      this._categoriaBO.validId(pageNumber);
      const result = await this._categoriaDAO.getAllPaginated(pageNumber);
      return new Response(200, this.createCategoria(result));
   }

   public async add(categoria): Promise<Response> {
      this._categoriaBO.validCategoria(categoria);
      const result = await this._categoriaDAO.add(categoria);
      return new Response(200, this.createCategoria(result));
   }

   public async delete(id: number): Promise<Response> {
      const result = await this._categoriaDAO.delete(id);
      return new Response(200, this.createCategoria(result));
   }

   public async updateNome(id: number, nome: string): Promise<Response> {
      const result = await this._categoriaDAO.updateNome(id, nome);
      return new Response(200, this.createCategoria(result.recordset));

   }

   private createCategoria(categoria): Array<Categoria> {
      const categorias = new Array<Categoria>();
      if (categoria && categoria.length) {
         categoria.forEach(c => categorias.push(new Categoria(c["nome"], c["id"])));
      }

      return categorias;
   }
}
