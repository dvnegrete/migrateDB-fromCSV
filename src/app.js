import express, { request, response } from 'express';

import path, { join } from "path";
import { fileURLToPath } from 'url';


import { database } from './database/mySql.js';
import { chargeCSV, duplicateMatriculaCSVFile, readCSVFile } from './helpers/fileCSV.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.get('/', async (req = request, res = response) => {
  try {
    //const querySQL = 'show full columns from estudiantes';
    const querySQL = 'SELECT * FROM estudiantes';
    (await database).query
    const [results, fields] = await (await database).execute(querySQL)
    //const [rows, fields] = await database.execute(querySQL);
    //console.log(fields);
    //console.log("Conexion");
    //res.json(rows)
    res.json(results)

  } catch (err) {
    console.error("Error al hacer la consulta SQL, ", err.stack);
    res.status(500).json({ msg: "Error al hacer la consulta SQL" });
  }
})

app.get('/path', (req, res) => {
  const results = __dirname
  console.log("PATH", results);

  res.json(results)
})

app.post('/', async (req = request, res = response) => {
  try {
    const csvFilePath = join(__dirname + '/data/c-13.csv');
    const result = await readCSVFile(csvFilePath);      
    res.json(result)
  } catch (err) {
    console.error("Error readCSVFileL, ", err.stack);
    res.status(500).json({ msg: "Error readCSVFile" });
  }
})

app.get('/duplicateMatricula', async (req = request, res = response) => {
  try {
    const csvFilePath = join(__dirname + '/data/c-13.csv');
    const result = await duplicateMatriculaCSVFile(csvFilePath);      
    res.json(result)
  } catch (err) {
    console.error("Error readCSVFileL, ", err.stack);
    res.status(500).json({ msg: "Error readCSVFile" });
  }
})

app.post('/charge', async (req = request, res = response) => {
  try {
    const csvFilePath = join(__dirname + '/data/c-13.csv');
    const result = await chargeCSV(csvFilePath);      
    res.json(result)
  } catch (err) {
    console.error("Error chargeCSV ", err.stack);
    res.status(500).json({ msg: "Error chargeCSV" });
  }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
