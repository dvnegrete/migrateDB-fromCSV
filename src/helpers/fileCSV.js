import csv from "csv-parser";
import { createReadStream } from "fs";
import { hasDisability } from "./disability.js";
import { database } from "./../database/mySql.js";
import { domiciliosModel } from "../models/domicilios.model.js";
import { matriculasModel } from "../models/matriculas.model.js";
import { estudiantesModel } from "../models/estudiantes.model.js";

export const readCSVFile = (csvFilePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (row) => {
        const rowCompressed = hasDisability(row);
        results.push(rowCompressed);
      })
      .on("end", () => {
        console.log("Archivo CSV procesado con éxito");
        resolve(results);
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};

export const duplicateMatriculaCSVFile = (csvFilePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    const seenNumbers = new Set();
    const duplicates = new Set();
    createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (row) => {
        const matricula = row.matricula;
        if (seenNumbers.has(matricula)) {
          duplicates.add(matricula);
        } else {
          seenNumbers.add(matricula);
          results.push(row);
        }
      })
      .on("end", () => {
        console.log("Archivo CSV procesado con éxito");
        console.log("Valores duplicados:", Array.from(duplicates));
        resolve({
          duplicates: Array.from(duplicates),
          total: duplicates.size,
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};

export const chargeCSV = (csvFilePath) => {
  return new Promise((resolve, reject) => {
    const result = [];
    createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", async (row) => {
        // const { queryMatricula, valuesMatricula } = matriculasModel(row);
        // const [matriculasResult] = await database.execute(
        //   queryMatricula,
        //   valuesMatricula
        // );
        // const matriculaId = await matriculasResult.insertId;

        const { queryDomicilios, valuesDomicilios } = domiciliosModel(row);
        const [domiciliosResult] = await database.execute(
          queryDomicilios,
          valuesDomicilios
        );
        const domicilioId = await domiciliosResult.insertId;

        // const { queryEstudiantes, valuesEstudiantes } = estudiantesModel(
        //   matriculaId,
        //   domicilioId,
        //   row
        // );
        // const [estudiantesResult] = await database.execute(
        //   queryEstudiantes,
        //   valuesEstudiantes
        // );
        //await database.commit();
        //result.push(estudiantesResult);
        result.push(domicilioId);

      })
      .on("end", () => {
        console.log("Archivo CSV procesado con éxito");
        resolve(result);
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};
