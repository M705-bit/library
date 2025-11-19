<h1>📘Biblioteca Pessoal - API REST</h1>

<p>A Biblioteca Pessoal, é uma API REST desenvlvida em Node.js e Express, focada em operações CRUD para gerenciar livros de diferentes usuários. Os dados são persistidos em arquivos JSON utiizando os módulos nativos do File System.</p>

<h3>👩‍💻 Tecnologias utilizadas </h3>
<ul>
  <li>Node.js</li>
  <li>Express</li>
  <li>JavaScript</li>
  <li>Postman (para testar e consumir a API)</li>
  <li>File System (para salvar e ler os dados em arquivos JSON)</li>
</ul>

<h3>⬆️Rotas disponíveis</h3>
<ul>
  <li>GET / -> mensagem de boas vindas </li>
  <li>GET /cadastro</li>
  <li>POST /cadastro -> cria um novo user</li>
  <li>GET /login</li>
  <li>POST /login -> autentica usuário</li> 
  <li>GET /livros/:nome -> lista livros do usuário</li>
  <li>POST /livros/:nome → adiciona novo livro ao acervo do usuário</li>
  <li>PUT /livros/:nome/:titulo -> atualiza informações de um livro específico</li>
  <li>DELETE /livros/:nome/:titulo → remove um livro do acervo</li>
</ul>

<h3>📖Funcionalidades CRUD:</h3>
<ul>
  <li>CREATE: inserção de novos livros na biblioteca com POST</li>
  <li>READ: Consulta de dados com GET, busca por livros do usuários e títulos específicos.</li>
  <li>UPDATE: Atualização de registros com PUT.</li>
  <li>DELETE: Remoção dos livros com DELETE.</li>
</ul>
<h3>🔎Estrutura Interna</h3>
<ul>
  <li>Classe User<ul><li>Atributos: nome, senha, arquivo JSON</li><li>Método: caminhoUsuario() → adiciona o usuário ao users.json e cria seu acervo pessoal em um arquivo próprio.</li></ul></li>
  <li>Funções Auxiliares:<ul>
    <li>lerUsuarios() → lê todos os usuários do users.json</li>
    <li>lerLivros(nomeUsuario) → retorna os livros do acervo de um usuário</li>
    <li>salvarLivros(lista, nomeUsuario) → salva lista atualizada de livros</li>
    <li>gerenciarLivro() → usa binary search para inserir e buscar livros em ordem alfabética</li>
  </ul></li>
</ul>
<h3>🔗Exemplos de requisições(via Postman ou Curl)</h3>
Cadastrar user:
<pre><code>POST http://localhost:3000/auth/cadastro
Body: { "nome": "Marina", "senha": "1234" }
</code></pre>
Login:
<pre><code>POST http://localhost:3000/auth/login
Body: { "nome": "Marina", "senha": "1234" }
</code></pre>
Adicionar livro:
<pre><code>POST http://localhost:3000/livros/Marina
Body: { "titulo": "Dom Casmurro", "autor": "Machado de Assis" }
</code></pre>
Atualizar liuvro:
<pre><code>PUT http://localhost:3000/livros/Marina/Dom Casmurro
Body: { "autor": "Machado de Assis", "ano": 1899 }
</code></pre>
Deletar livro:
<pre><code>DELETE http://localhost:3000/livros/Marina/Dom Casmurro
</code></pre>
<h3>👩‍🎓 O que eu aprendi:</h3>

Além de ser a primeira API que construí, esse projeto também foi meu primeiro contado com Node.JS, Express e requisições HTTP. Entendi como funciona o ciclo CRUD e como persistir dados em arquivos JSON. Ainda tenho muito o que melhorar e pretendo adicionar novas funcionalibilidades e organizar melhor esse projeto. 
