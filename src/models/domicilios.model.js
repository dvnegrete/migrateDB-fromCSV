import { stringToNumber } from "../helpers/conversions.js";

export const domiciliosModel = (row) => {
  row.cp = stringToNumber(row.cp);
  row.comprobanteDomicilio = row.comprobanteDomicilio === 'BD FISICA' ? null : row.comprobanteDomicilio;
  const queryDomicilios = `
    INSERT INTO domicilios (
      calle, numero, colonia, municipio_alcaldia, cp, estado, comprobante_domicilio
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const valuesDomicilios = [
    row.calle,
    null,
    row.colonia,
    row.municipio,
    row.estado,
    row.cp,
    row.comprobanteDomicilio,
  ];

  return { queryDomicilios, valuesDomicilios };
};
