export default class Cliente {
   public id: number;
   public nome: string;
   public endereco: number;
   public celular: string;

   constructor(nome: string, endereco: number, celular: string, id?: number) {
      this.nome = nome;
      this.endereco = endereco;
      this.celular = celular;
      if (id) this.id = id;
   }
}
