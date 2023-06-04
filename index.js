const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

function getNextId(livros) {
  if (livros.length === 0) {
    return 1;
  }
  const lastLivro = livros[livros.length - 1];
  return lastLivro.id + 1;
}

// app.get('/', (req, res) => {
//   try {
//     const dados = fs.readFileSync(path.join(__dirname, 'livros.json'));
//     const livros = JSON.parse(dados);
//     res.json(livros);
//   } catch (error) {
//     console.error('Erro ao listar os livros:', error);
//     res.status(500).send('Erro ao listar os livros');
//   }
// });

app.get('/', (req, res) => {
  try {
    const dados = fs.readFileSync(path.join(__dirname, 'livros.json'));
    const livros = JSON.parse(dados);
    res.json(livros);
  } catch (error) {
    console.error('Erro ao listar os livros:', error);
    res.status(500).send('Erro ao listar os livros');
  }
});

app.post('/', (req, res) => {
  try {
    const dadosAtuais = fs.readFileSync(path.join(__dirname, 'livros.json'));
    const livrosAtuais = JSON.parse(dadosAtuais);
    const novoLivro = req.body;
    novoLivro.id = getNextId(livrosAtuais);
    livrosAtuais.push(novoLivro);
    fs.writeFileSync(path.join(__dirname, 'livros.json'), JSON.stringify(livrosAtuais));
    res.send('Livro adicionado com sucesso!');
  } catch (error) {
    console.error('Erro ao adicionar o livro:', error);
    res.status(500).send('Erro ao adicionar o livro');
  }
});

app.listen(port, () => {
  console.log(`Escutando a porta ${port}`);
});
