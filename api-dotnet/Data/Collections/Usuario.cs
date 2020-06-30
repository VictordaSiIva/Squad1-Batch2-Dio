using api.Data.Enums;
using System;


namespace Api.Data.Collections
{
    public class Usuario
    {
        public Usuario(
            string id,
            string nome,
            string sobreNome,
            string senha,
            DateTime dataNascimento,
            string email,
            ETipoUsuario tipoUsuario            
            )
                      
        {
            this.Id = id;
            this.Nome = nome;
            this.SobreNome = sobreNome;
            this.Senha = senha;
            this.DataNascimento = dataNascimento;
            this.Email = email;
            this.TipoUsuario = tipoUsuario;
            

        }
        
        public string Id { get; set; }
        public string Nome { get; set; }

        public string SobreNome { get; set; }
        public string Senha { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Email { get; set; }
        public ETipoUsuario TipoUsuario { get; set; }
    }
}