import "jasmine";
import CategoriaBO from "../app/bo/CategoriaBO";
import Categoria from "../app/entity/Categoria";

describe("CategoriaBO =>", () => {
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
      categoria.nome = "";
      expect(() => {
         categoriaBO.validCategoria(categoria);
      }).toThrowError(CategoriaBO.NOME_INVALIDO);
   });
});
