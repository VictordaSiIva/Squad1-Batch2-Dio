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
    public class ProcessoController : ControllerBase
    {
        Data.MongoDB _mongoDB;
        IMongoCollection<Processo> _processosCollection;

        public ProcessoController(Data.MongoDB mongoDB)
        {
            _mongoDB = mongoDB;
            _processosCollection = _mongoDB.DB.GetCollection<Processo>(typeof(Processo).Name.ToLower());
        }

        [HttpPost]
        public ActionResult SalvarProcesso([FromBody] ProcessoDto dto)
        {
            var processo = new Processo(
                dto.Id,
                dto.NomeCliente,
                dto.NumProcesso,
                dto.DataDecisao,
                dto.Descricao,
                dto.ProximoPasso,
                dto.LinkProcesso
            );

            _processosCollection.InsertOne(processo);
            
            return StatusCode(201, "Processo cadastrado com sucesso");
        }

        [HttpGet]
        public ActionResult ObterProcessos()
        {
            var processos = _processosCollection.Find(Builders<Processo>.Filter.Empty).ToList();
            
            return Ok(processos);
        }
        
        [HttpGet("{id}")]
        public ActionResult ObterProcesso(string id)
        {
            var processo = _processosCollection.Find(Builders<Processo>.Filter
            .Where(_ => _.Id == id)).FirstOrDefault();            

            return Ok(processo);
        }

        [HttpPut]
        public ActionResult AtualizarProcesso([FromBody] ProcessoDto dto)
        {
            _processosCollection.UpdateOne(Builders<Processo>.Filter
            .Where(_ => _.Id == dto.Id),
            Builders<Processo>.Update.Set("nomeCliente", dto.NomeCliente)
                                     .Set("numProcesso", dto.NumProcesso)
                                     .Set("dataDecisao", dto.DataDecisao)
                                     .Set("descricao", dto.Descricao)
                                     .Set("proximoPasso", dto.ProximoPasso)
                                     .Set("linkProcesso", dto.LinkProcesso));
            
             return Ok("Processo atualizado com sucesso");
        }

        [HttpDelete("{id}")]
        public ActionResult DeletarProcesso(string id)
        {
            _processosCollection.DeleteOne(Builders<Processo>.Filter
            .Where(_ => _.Id == id));
            
            
             return Ok("Processo deletado com sucesso");
        }
    }
}
