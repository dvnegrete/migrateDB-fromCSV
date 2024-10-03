import { request, response } from "express";
import path, { join } from "path";
import { fileURLToPath } from "url";
import { database } from "./database/mySql.js";

import {
  readCSVFile,
  duplicateMatriculaCSVFile,
  chargeCSV,
  verifyBirthDate,
  verifyGender,
  duplicateCURPinCSVFile,
  matriculaBiggerCSVFile
} from "./helpers/fileCSV.js";
import { signToken } from "./helpers/singToken.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const csvFilePath = join(__dirname + "/data/c-13-depurado.csv");
// const csvFilePath = join(__dirname + "/data/c-13-errores.csv");

export const seletedForTable = async (req = request, res = response) => {
  try {
    const { table } = req.params;
    const { field, value } = req.query;
    //${ field === undefined ? "*" : field }
    const querySQL = `SELECT ${
      field === undefined ? "*" : field
    } FROM ${table} WHERE ${field} = ${value}`;
    //WHERE ${field} = null
    const [results, fields] = await (await database).execute(querySQL);
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
    const result = await readCSVFile(csvFilePath);
    res.json(result);
  } catch (err) {
    console.error("Error readCSVFileL, ", err.stack);
    res.status(500).json({ msg: "Error readCSVFile" });
  }
};

export const duplicateMatricula = async (req = request, res = response) => {
  try {
    const result = await duplicateMatriculaCSVFile(csvFilePath);
    res.json(result);
  } catch (err) {
    console.error("Error readCSVFileL, ", err.stack);
    res.status(500).json({ msg: "Error readCSVFile" });
  }
};

export const matriculaBigger = async (req = request, res = response) => {
  try {
    const result = await matriculaBiggerCSVFile(csvFilePath);
    res.json(result);
  } catch (err) {
    console.error("Error readCSVFileL, ", err.stack);
    res.status(500).json({ msg: "Error readCSVFile" });
  }
};

export const duplicateCURP = async (req = request, res = response) => {
  try {
    const result = await duplicateCURPinCSVFile(csvFilePath);
    res.json(result);
  } catch (err) {
    console.error("Error readCSVFileL, ", err.stack);
    res.status(500).json({ msg: "Error readCSVFile" });
  }
};

export const chargeFile = async (req = request, res = response) => {
  try {
    const result = await chargeCSV(csvFilePath);
    res.json(result);
  } catch (err) {
    console.error("Error chargeCSV ", err.stack);
    res.status(500).json({ msg: "Error chargeCSV" });
  }
};

export const verifyBirthdate = async (req = request, res = response) => {
  try {
    const result = await verifyBirthDate(csvFilePath);
    res.json(result);
  } catch (err) {
    console.error("Error readCSVFileL, ", err.stack);
    res.status(500).json({ msg: "Error readCSVFile" });
  }
};

export const gender = async (req = request, res = response) => {
  try {
    const result = await verifyGender(csvFilePath);
    res.json(result);
  } catch (err) {
    console.error("Error readCSVFileL, ", err.stack);
    res.status(500).json({ msg: "Error readCSVFile" });
  }
};

export const count = async (req = request, res = response) => {
  try {
    const { table } = req.params;
    const querySQL = `SELECT COUNT(*) AS total FROM ${table}`;
    const [results] = await (await database).execute(querySQL);
    console.log(results);

    res.json(results);
  } catch (err) {
    console.error("Error al hacer la consulta SQL, ", err.stack);
    res.status(500).json({ msg: "Error al hacer la consulta SQL" });
  }
};

export const changeTokenUser = async (req = request, res = response) => {
  try {
    const { id, email, nameComplete, username, role } = req.body;
    const payload = { id, username, email, nameComplete, role };
    const token = signToken(payload);
    res.json(token);
  } catch (err) {
    console.error("Token Error", err.stack);
    res.status(500).json({ msg: "Error Token" });
  }
};
