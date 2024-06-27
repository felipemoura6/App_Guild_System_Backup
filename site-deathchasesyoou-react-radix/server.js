// server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Endpoint para obter todos os membros
app.get('/members', (req, res) => {
  try {
    const rawData = fs.readFileSync('./database.json');
    const data = JSON.parse(rawData);
    res.json(data.members);
  } catch (error) {
    console.error('Error reading members data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint para excluir um membro por nome
app.delete('/members/:name', (req, res) => {
  const nameToDelete = req.params.name;

  try {
    const rawData = fs.readFileSync('./database.json');
    const data = JSON.parse(rawData);

    // Filtra os membros mantendo apenas aqueles cujo nome é diferente do fornecido
    data.members = data.members.filter(member => member.name !== nameToDelete);

    fs.writeFileSync('./database.json', JSON.stringify(data, null, 2));
    res.json({ message: `Member ${nameToDelete} removed successfully.` });
  } catch (error) {
    console.error(`Error removing member ${nameToDelete}:`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
