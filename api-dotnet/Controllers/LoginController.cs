using api.Data;
using Api.Data.Collections;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        Data.MongoDB _mongoDB;
        IMongoCollection<Usuario> _professoresCollection;

        public LoginController(Data.MongoDB mongoDB)
        {
            _mongoDB = mongoDB;
            _professoresCollection = _mongoDB.DB.GetCollection<Usuario>(typeof(Usuario).Name.ToLower());
        }

        [HttpPost]
        public ActionResult Autenticar([FromBody] Login login)
        {
            var usuario = _professoresCollection.Find(Builders<Usuario>.Filter
            .Where(_ => _.Email == login.email && _.Senha == login.senha)).FirstOrDefault();

            return Ok(usuario);

        }
    }
}
