using api.Data.Enums;
using System;

namespace Api.Models
{
    public class UsuarioDto
    {
        public string Id { get; set; }
        public string Nome { get; set; }
        public string SobreNome { get; set; }
        public string Senha { get; set; }
        public DateTime DtNascimento { get; set; }
        public string Email { get; set; }
        public ETipoUsuario ETipoUsuario { get; set; }

    } 
    public class ProcessoDto
    {
        public string Id { get; set; }
        public string NomeCliente { get; set; }
        public string NumProcesso { get; set; }
        public DateTime DataDecisao { get; set; }
        public string Descricao { get; set; }
        public string ProximoPasso { get; set; }
        public string LinkProcesso { get; set; }

    }
}