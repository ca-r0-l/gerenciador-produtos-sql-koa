import Endereco from "../entity/Endereco";
import EnderecoBO from "./EnderecoBO";
export default class ClienteBO {
   public static readonly ID_INVALIDO: string = "Id inválido";
   public static readonly NOME_INVALIDO: string = "Nome inválido";
   public static readonly CELULAR_INVALIDO: string = "Celular inválido";
   private _enderecoBO: EnderecoBO = new EnderecoBO();

   validId(id?: any): void {
      if (!id || (id && id <= 0)) {
         throw new Error(ClienteBO.ID_INVALIDO);
      }
   }

   validNome(nome?: any): void {
      if (!nome || (nome && nome.trim().length === 0)) {
         throw new Error(ClienteBO.NOME_INVALIDO);
      }
   }

   validCelular(celular?: string): void {
      if (!celular || (celular && celular.trim().length !== 9) || (celular && !Number.parseInt(celular))) {
         throw new Error(ClienteBO.CELULAR_INVALIDO);
      }
   }

   validEndereco(endereco?: number | Endereco): void {
      if (endereco) {
         if (typeof endereco === "number") {
            if (endereco <= 0) {
               throw new Error(EnderecoBO.ENDERECO_INVALIDO);
            }
         } else {
            this._enderecoBO.validEndereco(endereco);
         }
      } else {
         throw new Error(EnderecoBO.ENDERECO_INVALIDO);
      }
   }

   validCliente(cliente): void {
      this.validNome(cliente.nome);
      this.validCelular(cliente.celular);
      this.validEndereco(cliente.endereco);
   }
}
