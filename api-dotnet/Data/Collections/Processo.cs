using System;


namespace Api.Data.Collections
{
    public class Processo
    {
        public Processo(
            string id,
            string nomeCliente,
            string numProcesso,
            DateTime dataDecisao,
            string descricao,
            string proximoPasso,   
            string linkProcesso
            )
        {
            this.Id = id;
            this.NomeCliente = nomeCliente;
            this.NumProcesso = numProcesso;
            this.DataDecisao = dataDecisao;
            this.Descricao = descricao;
            this.ProximoPasso = proximoPasso;
            this.LinkProcesso = linkProcesso;
        }
        
        public string Id { get; set;}
        public string NomeCliente { get; set;}
        public string NumProcesso { get; set;}
        public DateTime DataDecisao { get; set;}
        public string Descricao { get; set;}
        public string ProximoPasso { get; set;}
        public string LinkProcesso { get; set;}
    }
}