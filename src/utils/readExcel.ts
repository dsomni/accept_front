import XLSX from 'xlsx';

export const readExcel = (file: ArrayBuffer) => {
  const workbook = XLSX.read(file);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  return sheet;
};

export const getAddUserData = (file: ArrayBuffer) => {
  const sheet = readExcel(file);
  return XLSX.utils.sheet_to_json(sheet);
};
