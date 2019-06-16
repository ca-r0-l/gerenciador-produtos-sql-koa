import Endereco from "../entity/Endereco";
export default class EnderecoBO {
   private static readonly ID_INVALIDO: string = "Id inválido";
   private static readonly RUA_INVALIDA: string = "Rua inválida";
   private static readonly NUMERO_INVALIDO: string = "Número inválido";
   private static readonly BAIRRO_INVALIDO: string = "Bairro inválido";
   private static readonly CIDADE_INVALIDA: string = "Cidade inválida";
   private static readonly ESTADO_INVALIDO: string = "Estado inválido";

   public validId(id: any): void {
      if (!id || (id && id <= 0)) {
         throw new Error(EnderecoBO.ID_INVALIDO);
      }
   }

   public validRua(rua: string): void {
      if (!rua || (rua && rua.trim().length === 0)) {
         throw new Error(EnderecoBO.RUA_INVALIDA);
      }
   }

   public validNumero(numero: number): void {
      if (!numero || (numero && numero <= 0)) {
         throw new Error(EnderecoBO.NUMERO_INVALIDO);
      }
   }

   public validBairro(bairro: string): void {
      if (!bairro || (bairro && bairro.trim().length === 0)) {
         throw new Error(EnderecoBO.BAIRRO_INVALIDO);
      }
   }

   public validCidade(cidade: string): void {
      if (!cidade || (cidade && cidade.trim().length === 0)) {
         throw new Error(EnderecoBO.CIDADE_INVALIDA);
      }
   }

   public validEstado(estado: string): void {
      if (!estado || (estado && estado.trim().length !== 2)) {
         throw new Error(EnderecoBO.ESTADO_INVALIDO);
      }
   }

   public validEndereco(endereco: Endereco): void {
      this.validRua(endereco.rua);
      this.validNumero(endereco.numero);
      this.validBairro(endereco.bairro);
      this.validCidade(endereco.cidade);
      this.validEstado(endereco.estado);
   }
}
