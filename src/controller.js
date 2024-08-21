import { request, response } from "express";
import path, { join } from "path";
import { fileURLToPath } from 'url';
import { database } from "./database/mySql.js";

import { readCSVFile, duplicateMatriculaCSVFile, chargeCSV } from "./helpers/fileCSV.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const seletedForTable = async (req = request, res = response) => {
  try {
    const { table } = req.params;
    const { field, value } = req.query;
    //${ field === undefined ? "*" : field }
    const querySQL = `SELECT ${ field === undefined ? "*" : field } FROM ${table} WHERE ${field} = ${value}`;
    //WHERE ${field} = null
    (await database).query;
    const [results, fields] = await (await database).execute(querySQL);
    //const [rows, fields] = await database.execute(querySQL);
    //console.log(fields);
    //console.log("Conexion");
    //res.json(rows)
    res.json(results);
  } catch (err) {
    console.error("Error al hacer la consulta SQL, ", err.stack);
    res.status(500).json({ msg: "Error al hacer la consulta SQL" });
  }
};

export const getPath = (req = request, res = response) => {
  const results = __dirname;
  console.log("PATH", results);

  res.json(results);
};

export const readFile = async (req = request, res = response) => {
  try {
    const csvFilePath = join(__dirname + "/data/c-13.csv");
    const result = await readCSVFile(csvFilePath);
    res.json(result);
  } catch (err) {
    console.error("Error readCSVFileL, ", err.stack);
    res.status(500).json({ msg: "Error readCSVFile" });
  }
};

export const duplicateMatricula = async (req = request, res = response) => {
  try {
    const csvFilePath = join(__dirname + "/data/c-13.csv");
    const result = await duplicateMatriculaCSVFile(csvFilePath);
    res.json(result);
  } catch (err) {
    console.error("Error readCSVFileL, ", err.stack);
    res.status(500).json({ msg: "Error readCSVFile" });
  }
};

export const chargeFile = async (req = request, res = response) => {
  try {
    const csvFilePath = join(__dirname + "/data/c-13.csv");
    const result = await chargeCSV(csvFilePath);
    res.json(result);
  } catch (err) {
    console.error("Error chargeCSV ", err.stack);
    res.status(500).json({ msg: "Error chargeCSV" });
  }
};
