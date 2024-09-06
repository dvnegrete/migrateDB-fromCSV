import { removeDisability } from "../shared/constants.js";

export const cleanDisability = (text) => {
  return removeDisability.includes(text) ? null : text;
};
