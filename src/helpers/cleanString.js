export const cleanString = (text) => {
  // Elimina comillas al princpio y final
  if (text.startsWith('"') && text.endsWith('"')) {
    text = text.slice(1, -1);
  }
  // Elimina acentos
  text = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  // Elimina caracteres no imprimibles o de control
  text = text.replace(/[^\x20-\x7E]/g, "");
  text.trim();
  return text;
};
