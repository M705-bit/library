import express from 'express';
import conectaNaDatabase from "./dbConnect.js";
import livro from "./Livros.js";

const conexao = await conectaNaDatabase();

conexao.on("error", (erro) => {
  console.error("erro de conexão", erro);
});

conexao.once("open", ()=> {
  console.log("Conexão bem sucedita");
});
const app = express();
app.use(express.json());


//pega requests para a homepage
app.get("/", (req, res)=> {
    res.status(200).send("Bem vindo a livraria");
    //carrega uma página de boas vindas, onde vai estar listado diversos livros

});
//pega tanto get requests para a rota livros como post request para adicionar mais livros ao banco de dados
app.get("/livros", async (req, res) => {
  const listaLivros = await livro.find({});
  res.status(200).json(listaLivros);
});
/*
app.route("/livros")

    .get((req, res)=> {
    res.status(200).json(livros);
    })
    .post( (req,res)=> {
        livros.push(req.body);
        const ultimo_livro=livros[livros.length - 1];
        res.status(201).send(`Livro "${ultimo_livro.titulo}" cadastrado com sucesso`);
        });
*/
// busca livros com um algorimo mais rápido 
app.get("/livros/:titulo", (req, res) => {
  const valor = req.params.titulo;
  const index = buscaLivros(valor);
  if (index!= -1) { res.status(200).json(livros[index]);}
  else { res.send(`Não temos o livro ${valor}`);}
});
// função para buscar livros 
var buscaLivros = function(valor) {
    const indice = livros.findIndex(livro => livro.titulo === valor);
    return indice;
}
// edita títulos de livros 
 app.put("/livros/:titulo", (req, res) => {
  const index = buscaLivros(req.params.titulo);
  if (index === -1) {
    return res.status(404).json({ erro: "Livro não encontrado" });
  }
  livros[index].titulo = req.body.titulo;
  res.status(200).json(livros[index]);
});

export default app;
/*
mongodb+srv://marinaHJ:<db_password>@cluster0.bdautyc.mongodb.net/?appName=Cluster0
*/