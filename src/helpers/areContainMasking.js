import { cleanString } from "./cleanString.js";

export const areContainMasking = (text) => {
  return text.includes("*") ? null : cleanString(text);
};
