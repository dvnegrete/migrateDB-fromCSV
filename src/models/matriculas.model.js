import {
  stringToNumber,
  annioMatricula,
  formatDate,
  dateMySQL,
} from "../helpers/conversions.js";
import { cleanString } from "../helpers/cleanString.js";

export const matriculasModel = (row) => {
  row.matricula = stringToNumber(row.matricula);
  const annio = annioMatricula(row.matricula);
  row.fechaRegistro = cleanString(row.fechaRegistro);  
  const timeStamp =
    row.fechaRegistro === null || row.fechaRegistro === undefined
      ? formatDate(new Date())
      : dateMySQL(row.fechaRegistro);
  const queryMatricula = `
    INSERT INTO matriculas (
      numero_matricula, annio, createdAt, updatedAt
    ) VALUES (?, ?, ? ,?)
  `;
  const valuesMatricula = [row.matricula, annio, timeStamp, timeStamp];

  return { queryMatricula, valuesMatricula };
};
