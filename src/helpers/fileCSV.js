import csv from 'csv-parser';
import { createReadStream } from 'fs';
import { hasDisability } from './disability.js';
import { convertDate, formatState, convertURL } from "./conversions.js";
import { database} from './../database/mySql.js'


export const readCSVFile = (csvFilePath) => {
    return new Promise((resolve, reject) => {
        const results = [];
        createReadStream(csvFilePath)
            .pipe(csv())
            .on('data', (row) => {
                const rowCompressed = hasDisability(row);
                results.push(rowCompressed);
            })
            .on('end', () => {
                console.log('Archivo CSV procesado con éxito');
                resolve(results);
            })
            .on('error', (err) => {
                reject(err)
            })
    });
}

export const chargeCSV = (csvFilePath) => {
    return new Promise((resolve, reject) => {
        const result = [];
        // Lectura del archivo CSV
        createReadStream(csvFilePath)
            .pipe(csv())
            .on('data', async (row) => {

                row.fechaRegistro = convertDate(row.fechaRegistro, true);
                row.fechaNacimiento = convertDate(row.fechaNacimiento);
                row.matricula = Number(row.matricula);
                row.telefono = Number(row.telefono);
                row.estado = formatState(row.estado);
                row.cp = Number(row.cp);
                // row.comprobanteDomicilio = row.comprobanteDomicilio === 'BD FISICA' ? row.comprobanteDomicilio : convertURL(row.comprobanteDomicilio);
                // row.comprobanteEstudios = row.comprobanteEstudios === 'BD FISICA' ? row.comprobanteEstudios : convertURL(row.comprobanteEstudios);
                // row.actaNacimiento = row.actaNacimiento === 'BD FISICA' ? row.actaNacimiento : convertURL(row.actaNacimiento);


                const query = `
                    INSERT INTO estudiantes (
                      fechaRegistro, curp, matricula, nombre, a_paterno, a_materno, genero,
                      fechaNacimiento, discapacidad, padecimiento, email, telefono, calle, colonia, municipio,
                      estado, cp, escolaridad, comprobanteDomicilio, comprobanteEstudios, actaNacimiento
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                  `;
                const values = [
                    row.fechaRegistro, row.curp, row.matricula, row.nombre, row.a_paterno, row.a_materno, row.genero,
                    row.fechaNacimiento, row.discapacidad, row.padecimiento, row.email, row.telefono, row.calle, row.colonia,
                    row.municipio, row.estado, row.cp, row.escolaridad, row.comprobanteDomicilio, row.comprobanteEstudios,
                    row.actaNacimiento
                ];
                

                (await database).execute(query, values, (err, results) => {
                    if (err) {
                        console.error('Error insertando datos:', err.stack);
                        return;
                    }
                    console.log('Datos insertados:', results.insertId);
                });
                result.push(values);
            })
            .on('end', () => {
                console.log('Archivo CSV procesado con éxito');
                resolve(result)
            })
            .on('error', (err) => {
                reject(err)
            })
    })
}