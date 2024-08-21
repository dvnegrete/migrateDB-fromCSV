import { dateMySQL } from "../helpers/conversions.js";

export const estudiantesModel = (matriculaId, domicilioId, row) => {
  const timeStamp =
    row.fechaRegistro === null || row.fechaRegistro === undefined
      ? formatDate(new Date())
      : dateMySQL(row.fechaRegistro);
  const queryEstudiantes = `
    INSERT INTO estudiantes (
      matricula_id, 
      curp, 
      nombre, 
      apellido_paterno, 
      apellido_materno, 
      sexo, 
      fecha_nacimiento, 
      domicilio_id, 
      discapacidad, 
      padecimiento, 
      email, 
      telefono, 
      escolaridad, 
      escolaridad_comprobante, 
      acta_nacimiento, 
      createdAt, updatedAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const valuesEstudiantes = [
    matriculaId,
    row.curp,
    row.nombre,
    row.a_paterno,
    row.a_materno,
    row.genero,
    row.fechaNacimiento,
    domicilioId,
    row.discapacidad,
    row.padecimiento,
    row.email,
    row.telefono,
    row.escolaridad,
    row.comprobanteEstudios,
    row.actaNacimiento,
    timeStamp,
    timeStamp,
  ];

  return { queryEstudiantes, valuesEstudiantes };
};
