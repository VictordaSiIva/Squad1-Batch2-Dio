using System;

namespace Api.Models
{
    public class UsuarioDto
    {
        public string Id { get; set; }
        public string Nome { get; set; }
        public string Password { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Email { get; set; }

    }
}