import { dateMySQL, parseDateBirth } from "../helpers/conversions.js";

export const estudiantesModel = (matriculaId, domicilioId, row) => {
  const timeStamp =
  row.fechaRegistro === null || row.fechaRegistro === undefined
  ? formatDate(new Date())
  : dateMySQL(row.fechaRegistro);
  const birthDate = row.fechaNacimiento === null || row.fechaNacimiento === undefined 
  ? null : parseDateBirth(row.fechaNacimiento);
  console.log(matriculaId, birthDate)

  const queryEstudiantes = `
    INSERT INTO estudiantes (matricula_id, curp, apellido_paterno, apellido_materno, nombre, fecha_nacimiento, domicilio_id, sexo, telefono, email, padecimiento, discapacidad, escolaridad, escolaridad_comprobante, acta_nacimiento, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const valuesEstudiantes = [
    matriculaId,
    row.curp.trim(),
    row.a_paterno.trim(),
    row.a_materno === "" ? null : row.a_materno.trim(),
    row.nombre.trim(),
    birthDate,
    domicilioId,
    row.genero.trim(),
    row.telefono === "" ? null : row.telefono.trim(),
    row.email === "" ? null : row.email.trim(),
    row.padecimiento === "" ? null : row.padecimiento.trim(),
    row.discapacidad === "" ? null : row.discapacidad.trim(),
    row.escolaridad === "" ? null : row.escolaridad.trim(),
    row.comprobanteEstudios === "" ? null : row.comprobanteEstudios.trim(),
    row.actaNacimiento === "" ? null : row.actaNacimiento.trim(),
    timeStamp,
    timeStamp,
  ];

  return { queryEstudiantes, valuesEstudiantes };
};
