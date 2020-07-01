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
            DateTime dtNascimento,
            string email,
            ETipoUsuario tipoUsuario            
            )
                      
        {
            this.Id = id;
            this.Nome = nome;
            this.SobreNome = sobreNome;
            this.Senha = senha;
            this.DtNascimento = dtNascimento;
            this.Email = email;
            this.TipoUsuario = tipoUsuario;
            

        }
        
        public string Id { get; set; }
        public string Nome { get; set; }

        public string SobreNome { get; set; }
        public string Senha { get; set; }
        public DateTime DtNascimento { get; set; }
        public string Email { get; set; }
        public ETipoUsuario TipoUsuario { get; set; }
    }
}