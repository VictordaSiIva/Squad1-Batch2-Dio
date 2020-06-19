using System;
using MongoDB.Driver.GeoJsonObjectModel;

namespace Api.Data.Collections
{
    public class Usuario
    {
        public Usuario(
            string id,
            string nome,
            string password,
            DateTime dataNascimento,
            string email)
        {
            this.Id = id;
            this.Nome = nome;
            this.Password = password;
            this.DataNascimento = dataNascimento;
            this.Email = email;
        }
        
        public string Id { get; set; }
        public string Nome { get; set; }
        public string Password { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Email { get; set; }

    }
}