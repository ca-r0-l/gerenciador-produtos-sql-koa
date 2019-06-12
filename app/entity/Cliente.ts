export default class Cliente {
   public id: number;
   public nome: string;
   public endereco: string;
   public celular: string;

   constructor(nome: string, endereco: string, celular: string, id?: number) {
      this.nome = nome;
      this.endereco = endereco;
      this.celular = celular;
      if (id) this.id = id;
   }
}
