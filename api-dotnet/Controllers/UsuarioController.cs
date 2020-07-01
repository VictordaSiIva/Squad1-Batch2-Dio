using System;
using Api.Data.Collections;
using Api.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace Api.Controllers
{
    
    [ApiController]
    [Route("[controller]")]
    public class UsuarioController : ControllerBase
    {
        Data.MongoDB _mongoDB;
        IMongoCollection<Usuario> _usuariosCollection;

        public UsuarioController(Data.MongoDB mongoDB)
        {
            _mongoDB = mongoDB;
            _usuariosCollection = _mongoDB.DB.GetCollection<Usuario>(typeof(Usuario).Name.ToLower());
        }

        [HttpPost]
        public ActionResult SalvarUsuario([FromBody] UsuarioDto dto)
        {
            var usuario = new Usuario(
                dto.Id,
                dto.Nome,
                dto.SobreNome,
                dto.Senha,
                dto.DtNascimento,
                dto.Email,
                dto.ETipoUsuario
            );

            _usuariosCollection.InsertOne(usuario);
            
            return StatusCode(201, "Cadastro concluido com sucesso");
        }

        [HttpGet]
        public ActionResult ObterUsuarios()
        {
            var usuarios = _usuariosCollection.Find(Builders<Usuario>.Filter.Empty).ToList();
            
            return Ok(usuarios);
        }
        
        [HttpGet("{id}")]
        public ActionResult ObterUsuario(string id)
        {
            var usuario = _usuariosCollection.Find(Builders<Usuario>.Filter
            .Where(_ => _.Id == id)).FirstOrDefault();            

            return Ok(usuario);
        }

        [HttpPut]
        public ActionResult AtualizarUsuario([FromBody] UsuarioDto dto)
        {
            _usuariosCollection.UpdateOne(Builders<Usuario>.Filter
            .Where(_ => _.Id == dto.Id),
            Builders<Usuario>.Update.Set("nome", dto.Nome)
                                    .Set("sobreNome", dto.SobreNome)
                                    .Set("senha", dto.Senha)
                                    .Set("dtNascimento", dto.DtNascimento)
                                    .Set("email", dto.Email));
            
            
             return Ok("Cadastro atualizado com sucesso");
        }

        [HttpDelete("{id}")]
        public ActionResult DeletarUsuario(string id)
        {
            _usuariosCollection.DeleteOne(Builders<Usuario>.Filter
            .Where(_ => _.Id == id));
            
            
             return Ok("Cadastro deletado com sucesso");
        }
    }
}
