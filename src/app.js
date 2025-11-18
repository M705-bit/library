import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(express.json());

//declarando as variáveis globalmente para serem usadas em todo o arquivo
let livrosSalvos = {};
let caminhoAcervo = path.resolve('src', 'users.json');
let caminhoArquivo = '';


function User(nome,senha){
  this.nome = nome;
  this.senha = senha;
  this.arquivo = `${nome}.json`;

  this.caminhoUsuario();
  
}
//método da função
User.prototype = {
  caminhoUsuario: function() {
    const dadosUsuario = { nome: this.nome, senha: this.senha
  };
  //definindo um caminho absoluto
  const userFile = path.resolve('src/users', `${this.arquivo}`);
  //criando um arquivo JSON com um array, para no futuro se tornar um array de objetos
  fs.writeFileSync(userFile, JSON.stringify([])); // cria arquivo vazio

  //fs.writeFileSync(userFile, JSON.stringify(dadosUsuario, null, 2), 'utf-8');
  //atualiza o acervo.json com o novo user
  let acervo = [];

  const conteudo = fs.readFileSync(caminhoAcervo, "utf-8");
  acervo = JSON.parse(conteudo);
  acervo.push(dadosUsuario);
  fs.writeFileSync(caminhoAcervo, JSON.stringify(acervo, null, 2), "utf-8");
}
}

app.get("/login", (req, res) => {
  // lógica para login
  res.status(200).send("Digite nome e senha para login");
});

app.get("/cadastro", (req, res) => {
  // lógica para cadastro
  res.status(200).send("Digite nome e senha para cadastro");

});

app.post("/cadastro", (req, res) => {
  //lembrando que aqui estamos usando o spread operator para copiar as propriedades do objeto req.body para o novo objeto User
  const { nome, senha } = req.body;
  //users vira uma array de objetos 
  const users = lerUsuarios();
  //verifica se o usuário já existe
  const userExists = users.find(user => user.nome === nome);
  if (userExists) {
    return res.status(409).send("Usuário já existe");
  }
  const novoUser = new User(nome, senha);
  res.status(201).send(`Usuário ${nome} cadastrado com sucesso`);
});

app.post("/login", (req, res) => {
  const { nome, senha } = req.body;
  //tem que acessar o arquivo users.json para verificar se o user existe

  const users = lerUsuarios();
  
  const user = users.find(user => user.nome === nome && user.senha === senha);

  if (user) {
    caminhoArquivo = path.resolve('src/users', `${nome}.json`);
    livrosSalvos = fs.readFileSync(caminhoArquivo, 'utf-8');
    return res.status(200).send(`Bem-vindo, ${nome}!`);
  }

  return res.status(401).send("Nome ou senha incorretos");
});

function lerUsuarios() {
  const usuarios = fs.readFileSync(caminhoAcervo, 'utf-8');
  return JSON.parse(usuarios);
}

function lerLivros(nomeUsuario) {
  const caminhoArquivoUsuario = path.resolve('src/users', `${nomeUsuario}.json`);
  const livros = fs.readFileSync(caminhoArquivoUsuario, 'utf-8');
  return JSON.parse(livros);
}

function salvarLivros(lista, nomeUsuario) {
  const caminhoArquivo = path.resolve("src/users", `${nomeUsuario}.json`);
  fs.writeFileSync(caminhoArquivo, JSON.stringify(lista, null, 2));
  
}

function gerenciarLivro(livro, nomeUsuario, modo = "buscar") {
  if (!livro || typeof livro.titulo !== "string") {
    throw new Error("Livro inválido: título ausente ou mal formatado");
  }

  const listaDeLivros = lerLivros(nomeUsuario);
  let baixo = 0;
  let alto = listaDeLivros.length - 1;

  while (baixo <= alto) {
    //Math.floor arredonda o número para baixo
    let meio = Math.floor((baixo + alto) / 2);
    const atual = listaDeLivros[meio];
    if (!atual || typeof atual.titulo !== "string") break;
    //localeCompare compara a ordem alfabética do livro de input com o livro atual da lista, 
    const comparacao = livro.titulo.localeCompare(atual.titulo);
    //o livro de input vem depois do atual na ordem alfabética
    if (comparacao > 0) {
      baixo = meio + 1;
    } 
    //o livro de input vem antes do atual na ordem alfabética
    else if (comparacao < 0) {
      alto = meio - 1;
    } else {
      // Você encontrou o livro e retorna um objeto com o índice e a lista
      if (modo === "buscar") return { indice: meio, lista: listaDeLivros };
      return { indice: meio, lista: listaDeLivros }; // já existe
    }
  }
// Livro não encontrado, portanto talvez o user queira inseri-lo, caso não, retorna índice nulo
  if (modo === "inserir") {
    /* splice é um método que insere elementos em um array em uma posição específica, nesse caso, 
    insere livro na posição baixo e o 0 indica que nenhum elemento deve ser removido */
    listaDeLivros.splice(baixo, 0, livro);
    salvarLivros(listaDeLivros, nomeUsuario);
    return { indice: baixo, lista: listaDeLivros };
  }

  return { indice: null, lista: listaDeLivros };
}

app.get("/", (req, res)=> {
    res.status(200).send("Bem vindo a livraria");

});

app.get("/livros/:nome",(req, res) => {
  const { nome } = req.params;
  const livros = lerLivros(nome);
  res.status(200).json(livros);
});

app.post("/livros/:nome",  (req, res) => {
  const { nome } = req.params;
  const {indice} = gerenciarLivro(req.body, nome, "inserir");
  res.status(201).send(`Livro "${req.body.titulo}" cadastrado com sucesso`);
});

app.put("/livros/:nome/:titulo", (req, res) => {
  const { nome, titulo } = req.params;
  const { lista, indice } = gerenciarLivro({ titulo }, nome, "buscar");

  if (indice === null) {
    return res.status(404).json({ erro: "Livro não encontrado" });
  }
  console.log("Atualizacao recebida:", req.body);
  lista[indice] = { ...lista[indice], ...req.body };
  salvarLivros(lista, nome);
  res.status(200).json(lista[indice]);
});

app.delete("/livros/:nome/:titulo", (req, res) => {
  const {lista, indice} = gerenciarLivro({ titulo: req.params.titulo }, req.params.nome, "buscar");
  if (indice == null) {
    return res.status(404).json({ erro: "Livro não encontrado" });
  }
  lista.splice(indice, 1);
  salvarLivros(lista, req.params.nome);
  res.status(204).send("livro deletado com sucesso");
});

export default app;


