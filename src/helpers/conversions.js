import moment from "moment";
import {
  monthsDictionary as months,
  numberStateMexican,
} from "../shared/constants.js";

export const convertDate = (dateString, hours = false) => {
  return hours ? new Date() : moment(dateString).format("YYYY-MM-DD");
};

export const formatState = (value) => {
  return Number.isNaN(parseInt(value))
    ? value
    : assignNameState(parseInt(value));
};

export const assignNameState = (numberValue) => numberStateMexican[numberValue];

export const stringToNumber = (value) => Number(value);

export const annioMatricula = (stringNumber) => {
  const res = String(stringNumber).slice(0, 4);
  return stringToNumber(res);
};

export const dateMySQL = (dateString) => {
  const [day, monthString, year, time, period] = dateString.split(" ");
  const month = months[monthString];
  if (time !== undefined) {
    let [hours, minutes, seconds] = time.split(":");
    if ((period === "p.m." || period === "p. m.") && hours !== "12") {
      hours = String(parseInt(hours) + 12);
    }
    if ((period === "a.m." || period === "a. m.") && hours === "12") {
      hours = "00";
    }
    return `${year}-${month}-${day.padStart(2, "0")} ${hours.padStart(
      2,
      "0"
    )}:${minutes}:${seconds}`;
  } else {
    return formatDate(new Date());
  }
};

export const formatDate = (date) => {
  return date.toISOString().slice(0, 19).replace("T", " ");
};

const completeFourDigitYear = (fullYear) => {
  return fullYear >= 0 && fullYear <= 10
    ? (fullYear += 2000) // Manejar años de 2000 a 2010
    : (fullYear += 1900); // Manejar años de 1900 a 1999
};

export const parseDateBirth = (dateStr) => {
  const [day, month, year] = dateStr.split("-");
  const notExchange = Number(day) <= 31 && day.length < 3;
  const verifyDay = notExchange ? day : year;
  const verifyYear = notExchange ? year : day;
  const fullYear =
    verifyYear.length === 4
      ? verifyYear
      : completeFourDigitYear(Number(verifyYear));
  return `${fullYear}-${months[month]}-${verifyDay.padStart(2, "0")}`;
};
