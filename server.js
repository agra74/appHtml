const express = require('express');
const path = require('path');
const fs = require('fs');
// node-adodb is required for MS Access connection
const ADODB = require('node-adodb');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

const dbFile = path.join(__dirname, 'database.accdb');

function getConnection() {
  return ADODB.open(`Provider=Microsoft.ACE.OLEDB.12.0;Data Source=${dbFile};Persist Security Info=False;`);
}

async function ensureDatabase() {
  if (!fs.existsSync(dbFile)) {
    fs.writeFileSync(dbFile, '');
  }
  const connection = getConnection();
  try {
    await connection.execute("CREATE TABLE parametre (nom_agence TEXT, code_agence TEXT)");
  } catch (e) {
    // Table may already exist
  }
  try {
    await connection.execute("CREATE TABLE utilisateur (matricule TEXT, nomeprenom TEXT, role TEXT, motdepasse TEXT)");
  } catch (e) {
    // Table may already exist
  }
  return connection;
}

app.post('/setup', async (req, res) => {
  const data = req.body;
  try {
    const connection = await ensureDatabase();
    await connection.execute(`INSERT INTO parametre (nom_agence, code_agence) VALUES ('${data.nom_agence}', '${data.code_agence}')`);
    await connection.execute(`INSERT INTO utilisateur (matricule, nomeprenom, role, motdepasse) VALUES ('${data.matricule}', '${data.nomeprenom}', '${data.role}', '${data.motdepasse}')`);
    res.json({status: 'ok'});
  } catch (err) {
    console.error(err);
    res.status(500).json({status:'error', message: err.message});
  }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
