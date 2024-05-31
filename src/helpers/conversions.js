import dotenv from 'dotenv'
import moment from "moment";
import { numberStateMexican } from '../shared/constants.js';

dotenv.config()

export const convertDate = (dateString, hours = false) => {
    return hours ? new Date() : moment(dateString).format("YYYY-MM-DD ");
}

export const formatState = (value) => {
    return Number.isNaN(parseInt(value)) ? value : assignNameState(parseInt(value));
}

export const convertURL = (nameFile) => {
    return process.env.URL_FILES + nameFile;
}

export const assignNameState = (numberValue) => numberStateMexican[numberValue];
