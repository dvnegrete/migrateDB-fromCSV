import { dateMySQL, formatDate, formatState } from "../helpers/conversions.js";
import { cleanString } from "../helpers/cleanString.js";

export const domiciliosModel = (row) => {
  row.calle = cleanString(row.calle);
  row.colonia = cleanString(row.colonia);
  row.municipio = cleanString(row.municipio);
  row.cp = row.cp === "" ? null : row.cp.toString().padStart(5, "0");
  const stateWithName =
  row.estado === row.estado.length < 2 ? row.estado : formatState(row.estado);
  row.comprobanteDomicilio = cleanString(row.comprobanteDomicilio);
  row.comprobanteDomicilio =
  row.comprobanteDomicilio === "BD FISICA" ? null : row.comprobanteDomicilio;
  row.fechaRegistro = cleanString(row.fechaRegistro);
  const timeStamp =
    row.fechaRegistro === null || row.fechaRegistro === undefined
      ? formatDate(new Date())
      : dateMySQL(row.fechaRegistro);
  const queryDomicilios = `
    INSERT INTO domicilios (
      calle, numero, colonia, municipio_alcaldia, cp, estado, comprobante_domicilio, createdAt, updatedAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const valuesDomicilios = [
    row.calle === "" ? null : row.calle,
    null,
    row.colonia === "" ? null : row.colonia,
    row.municipio === "" ? null : row.municipio,
    row.cp === "" ? null : row.cp,
    stateWithName === "" ? null : stateWithName,
    row.comprobanteDomicilio === "" ? null : row.comprobanteDomicilio,
    timeStamp,
    timeStamp,
  ];
  
  
  return { queryDomicilios, valuesDomicilios };
};
