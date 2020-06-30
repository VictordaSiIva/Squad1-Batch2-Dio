<h1 align="center">API.NET integrada ao MongoDB Atlas para Controle de Clientes e Processos</h1>

## clone o repositório 

`git clone https://github.com/4lexRossi/api-dotnet.git`

## 🔧 Stacks utilizadas:

 * dotnet 3.1.300
 * Asp.NetCore
 * C#
 * Mongo DB Atlas Database

## 🚀 Instalar dependências
```
    dotnet add package MongoDB.Driver
```

Criar uma conta no [MongoDB](https://www.mongodb.com/)
Após a criação terá que alterar o campo 

```
"ConnectionString": "mongodb+srv://seu_usuario:sua_senha@dotnet-mongo-seu_usuario-v5slk.gcp.mongodb.net/test?retryWrites=true&w=majority"
no arquivo appsettings.json
```

## Para iniciar o servidor, use o comando:

```
   dotnet run
```

## Testando a Api rodando em um servidor local:

ele vai abrir na porta -> [localhost:5000](http://localhost:5000/)

use o endereço -> [localhost:5000/Usuario](http://localhost:5000/Usuario) para utilizar (o)a Usuario(a) e testar os métodos `POST`, `GET` e `PUT` para `DELETE` adicione `/Id` ao final do endereço.
<p></p>

use o endereço -> [localhost:5000/Processo](http://localhost:5000/Processo) para utilizar o processo e testar os métodos `POST`, `GET` e `PUT` para `DELETE` adicione `/Id` ao final do endereço.



## Links Uteis

- .net core - https://dotnet.microsoft.com/download

- visual code - https://code.visualstudio.com/download

- postman - https://www.postman.com/downloads/

- mongo atlas - https://www.mongodb.com/cloud/atlas/register


-----------------------------------------------

## Referências

https://docs.mongodb.com/

https://docs.mongodb.com/manual/

https://docs.mongodb.com/ecosystem/drivers/csharp/

https://docs.atlas.mongodb.com/

<h1 align="center">Oi quer ser meu Amigo</h1>
<p align="center">
  <a href="https://www.linkedin.com/in/4lex/">
    <img src="https://avatars3.githubusercontent.com/u/62000504?s=400&u=9077ec8b32016a8accbb59dfc8e6d217b7b1b468&v=4" title="Alex Rossi" width="80" height="80">
  </a>