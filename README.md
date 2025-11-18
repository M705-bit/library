Biblioteca Pessoal, é uma API REST desenvolvida com Node.js e JavaScript, focada em operações CRUD. 
Tecnologias utilizadas:
- Express 
- Node.js
- Postman (para fazer requisições a API)
- Módulos do File System para persistir dados.

Rotas do projeto:
GET /
GET /cadastro
POST /cadastro
GET /login
POST /login
GET /livros/:nome
POST /livros/:nome
PUT /livros/:nome/:titulo
DELETE /livros/:nome/:titulo

Funcionalidades CRUD com as requisições HTTP:
- CREATE: inserção de novos livros na biblioteca com POST
- READ: Consulta de dados com GET, busca por livros do usuários e títulos específicos.
- UPDATE: Atualização de registros com PUT.
- DELETE: Remoção dos livros com DELETE.

Classes:
User
atributos: nome, senha, aquivo JSON
métodos: caminhoUsuário, com esse método adicionamos o user ao arquivo JSON users, onde estão todas as senhas e usuários. E criamos um arquivo JSON com o nome dele, onde serão adicionados todos os livros do acervo pessoal desse usuário.

Funções auxiliares:
lerUsuários() -> pega os dados do arquivo users.json
lerLivros(nomeUsuário) -> pega os dados do acervo pessoal do user
salvaLivros(lista, nomeUser) -> salva a lista atualizada do nome dos usuários
gerenciarLivro() -> função que implementa binary serach para inserir os livros em ordem alfabética no arquivo json e buscá-los de forma rápida.

isso tudo está em um mesmo arquivo, preciso organizar isso...

Já o arquivo servidor.js importa a configuração do Express e liga o servidor para começar a receber requisições.

O que eu aprendi com esse projeto:
Além de ser a primeira API que construí, esse projeto também foi meu primeiro contado com Node.JS, Express e requisições HTTP. 
