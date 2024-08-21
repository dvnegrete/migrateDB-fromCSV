import moment from "moment";
import { numberStateMexican } from "../shared/constants.js";

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
  const months = {
    ene: "01",
    feb: "02",
    mar: "03",
    abr: "04",
    may: "05",
    jun: "06",
    jul: "07",
    ago: "08",
    sept: "09",
    sep: "09",
    oct: "10",
    nov: "11",
    dic: "12",
  };
  // if (dateString.includes('"')) {
  //   console.log(dateString);
  //   return formatDate(new Date());

  // }

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
    // console.log(dateString);
    // console.log(`${day}-${month}-${year} | ${time} | ${period}`);
    return formatDate(new Date());
  }
};

export const formatDate = (date) => {
  return date.toISOString().slice(0, 19).replace("T", " ");
};
