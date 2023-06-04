import express from 'express';
const port = process.env.PORT || 3000;

const app = express();

app.get('/', (req,res) =>{
res.send('Exprexx funcionou')

}) 

app.listen(port, () => {
    console.log(`Escutando a porta ${port}`);
  });