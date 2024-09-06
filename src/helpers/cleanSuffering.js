import { removeSuffering } from "../shared/constants.js";

export const cleanSuffering = (text) => {
  return removeSuffering.includes(text) ? null : text;
};
