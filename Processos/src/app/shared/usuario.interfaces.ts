export interface Usuario {
  id: string;
  nome: string;
  sobreNome: string;
  dtNascimento: string;
  email: string;
  senha: string;
  eTipoUsuario: number;

}

export interface Login {
  email: string;
  senha: string;
}
