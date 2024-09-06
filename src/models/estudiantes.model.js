import { dateMySQL, parseDateBirth } from "../helpers/conversions.js";
import { cleanString } from "../helpers/cleanString.js";
import { areContainMasking } from "../helpers/areContainMasking.js";
import { cleanSuffering } from "../helpers/cleanSuffering.js";
import { cleanDisability } from "../helpers/cleanDisability.js";

export const estudiantesModel = (matriculaId, domicilioId, row) => {
  row.curp = cleanString(row.curp);
  row.a_paterno = cleanString(row.a_paterno);
  row.a_materno = cleanString(row.a_materno);
  row.nombre = cleanString(row.nombre);
  row.genero = cleanString(row.genero);
  row.telefono = areContainMasking(row.telefono);
  row.email = areContainMasking(row.email);
  row.padecimiento = cleanString(row.padecimiento);
  row.padecimiento = cleanSuffering(row.padecimiento);
  row.discapacidad = cleanString(row.discapacidad);
  row.discapacidad = cleanDisability(row.discapacidad);
  row.escolaridad = cleanString(row.escolaridad);
  row.comprobanteEstudios = cleanString(row.comprobanteEstudios);
  row.comprobanteEstudios =
    row.comprobanteEstudios === "BD FISICA" ? null : row.comprobanteEstudios;
  row.actaNacimiento = cleanString(row.actaNacimiento);
  row.actaNacimiento =
    row.actaNacimiento === "BD FISICA" ? null : row.actaNacimiento;

  const timeStamp =
    row.fechaRegistro === null || row.fechaRegistro === undefined
      ? formatDate(new Date())
      : dateMySQL(row.fechaRegistro);
  const birthDate =
    row.fechaNacimiento === null || row.fechaNacimiento === undefined
      ? null
      : parseDateBirth(row.fechaNacimiento);

  const queryEstudiantes = `
    INSERT INTO estudiantes (matricula_id, curp, apellido_paterno, apellido_materno, nombre, fecha_nacimiento, domicilio_id, sexo, telefono, email, padecimiento, discapacidad, escolaridad, escolaridad_comprobante, acta_nacimiento, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const valuesEstudiantes = [
    matriculaId,
    row.curp,
    row.a_paterno,
    row.a_materno === "" ? null : row.a_materno,
    row.nombre,
    birthDate,
    domicilioId,
    row.genero,
    row.telefono === "" ? null : row.telefono,
    row.email === "" ? null : row.email,
    row.padecimiento === "" ? null : row.padecimiento,
    row.discapacidad === "" ? null : row.discapacidad,
    row.escolaridad === "" ? null : row.escolaridad,
    row.comprobanteEstudios === "" ? null : row.comprobanteEstudios,
    row.actaNacimiento === "" ? null : row.actaNacimiento,
    timeStamp,
    timeStamp,
  ];

  return { queryEstudiantes, valuesEstudiantes };
};
