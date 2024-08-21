import { dateMySQL, formatDate, formatState } from "../helpers/conversions.js";

export const domiciliosModel = (row) => {
  row.cp = row.cp === "" ? null : row.cp.toString().padStart(5, "0");
  row.comprobanteDomicilio =
    row.comprobanteDomicilio === "BD FISICA" ? null : row.comprobanteDomicilio;
  const stateWithName =
    row.estado === row.estado.length < 2 ? row.estado : formatState(row.estado);
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
    row.calle  === "" ? null : row.calle,
    null,
    row.colonia  === "" ? null : row.colonia,
    row.municipio  === "" ? null : row.municipio,
    row.cp  === "" ? null : row.cp,
    stateWithName === "" ? null : stateWithName,
    row.comprobanteDomicilio  === "" ? null : row.comprobanteDomicilio,
    timeStamp,
    timeStamp,
  ];

  return { queryDomicilios, valuesDomicilios };
};
