import express from 'express';

const app = express();
app.use(express.json());

//meu banco de dados dos livros
const livros = [
    {
        id: 1,
        titulo: "Amêndoas"
    }
]
//pega requests para a homepage
app.get("/", (req, res)=> {
    res.status(200).send("Curso de Node.js");

});
//pega tanto get requests para a rota livros como post request para adicionar mais livros ao banco de dados
app.route("/livros")

    .get((req, res)=> {
    res.status(200).json(livros);
    })
    .post((req,res)=> {
        livros.push(req.body);
        const ultimo_livro=livros[livros.length - 1];
        res.status(201).send(`Livro "${ultimo_livro.titulo}" cadastrado com sucesso`);
        });

// busca livros 
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