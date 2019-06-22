import "jasmine";
import CategoriaBO from "../app/bo/CategoriaBO";
import Categoria from "../app/entity/Categoria";

describe("categoria", () => {
   const categoriaBO = new CategoriaBO();
   let categoria: Categoria;
   beforeEach(() => {
      categoria = new Categoria("salgados fritos", 1);
   });

   it("categoria válida, não retornará erro", () => {
      expect(() => {
         categoriaBO.validCategoria(categoria);
      }).not.toThrow();
   });

   it("nome da categoria inválida, erro: NOME_INVALIDO", () => {
      expect(() => {
         categoriaBO.validCategoria(categoria);
      }).not.toThrow(CategoriaBO.NOME_INVALIDO);
   });
});
