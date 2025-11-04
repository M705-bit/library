import express from 'express';

const app = express();
app.use(express.json());

// estarei trabalhando com array de objetos, pois até este momento 04/11 nunca trabalhei com banco de dados
// depois de aprender a trabalhar com arrays de objetos, vou aprender a trabalhar com banco de dados
const livros = [
  { titulo: "Dom Casmurro", autor: "Machado de Assis", paginas: 256 },
  { titulo: "1984", autor: "George Orwell", paginas: 328 },
];

app.get("/", (req, res)=> {
    res.status(200).send("Bem vindo a livraria");
});

app.get("/livros",(req, res) => {
  res.status(200).json(livros);
});

function gerenciarLivro(listaDeLivros, livro, modo = "buscar") {
  if (!livro || typeof livro.titulo !== "string") {
    throw new Error("Livro inválido: título ausente ou mal formatado");
  }

  let baixo = 0;
  let alto = listaDeLivros.length - 1;

  while (baixo <= alto) {
    let meio = Math.floor((baixo + alto) / 2);
    const atual = listaDeLivros[meio];
    if (!atual || typeof atual.titulo !== "string") break;

    const comparacao = livro.titulo.localeCompare(atual.titulo);

    if (comparacao > 0) {
      baixo = meio + 1;
    } else if (comparacao < 0) {
      alto = meio - 1;
    } else {
      // Encontrado
      if (modo === "buscar") return meio;
      return meio; // já existe, não insere
    }
  }

  if (modo === "inserir") {
    listaDeLivros.splice(baixo, 0, livro);
    //return baixo;
  }

  return null; // não encontrado
}

app.post("/livros",  (req, res) => {
  const novoLivro = req.body;
  gerenciarLivro(livros, novoLivro, "inserir");
  res.status(201).send(`Livro "${novoLivro.titulo}" cadastrado com sucesso`);
});

app.put("/livros/:titulo", (req, res) => {
  const tituloAntigo = req.params.titulo.trim();
  const indice = gerenciarLivro(livros, { titulo: tituloAntigo }, "buscar");

  if (indice === null) {
    return res.status(404).json({ erro: "Livro não encontrado" });
  }

  livros[indice] = { ...livros[indice], ...req.body };
  res.status(200).json(livros[indice]);
});


app.delete("/livros/:titulo", (req, res) => {
  const titulo = req.params.titulo;
  let resultado = gerenciarLivro(livros, { titulo: titulo }, "buscar");
  if (resultado == null) {
    return res.status(404).json({ erro: "Livro não encontrado" });
  }
  livros.splice(resultado, 1);
  res.status(204).send("livro deletado com sucesso");
});

export default app;


