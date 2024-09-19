import * as XLSX from 'xlsx';

function filterDataBase(str: string): boolean {
  const normalize: string = str.toLowerCase().replace(/[_ ]+/g, ' ').trim();

  return normalize === 'base dados' || normalize === 'base de dados';
}

export default class ExcelService {
  static async readExcelFile(
    file: File,
    returnOnlyThisSheetName?: string
  ): Promise<{ [sheetname: string]: unknown[] }> {
    const reader = new FileReader();
    const buffer = await new Promise<ArrayBuffer>((resolve, reject) => {
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const buffer = event.target?.result as ArrayBuffer;
        resolve(buffer);
      };
      reader.onerror = (event: ProgressEvent<FileReader>) => {
        reject(event);
      };
      reader.readAsArrayBuffer(file);
    });

    const workbook = XLSX.read(buffer, { type: 'array' });

    const result: { [sheetName: string]: unknown[] } = {};

    let matchSheetName: string | null = null;

    workbook.SheetNames.forEach((sheetName: string) => {
      if (returnOnlyThisSheetName) {
        if (!filterDataBase(sheetName)) return;

        matchSheetName = sheetName;
      }

      const sheet = workbook.Sheets[sheetName];
      const json: unknown[] = XLSX.utils.sheet_to_json(sheet, { defval: '' });

      const emptyColumns = json.reduce<string[]>((acc, row) => {
        if (typeof row === 'object' && row !== null) {
          Object.keys(row).forEach((column) => {
            if (column === '__EMPTY' || column.match(/__EMPTY_\d+/)) {
              acc.push(column);
            }
          });
        }
        return acc;
      }, []);

      json.forEach((row) => {
        if (typeof row === 'object' && row !== null) {
          const typedRow = row as { [key: string]: unknown };

          emptyColumns.forEach((column) => {
            delete typedRow[column];
          });
        }
      });

      result[sheetName] = json;
    });

    return returnOnlyThisSheetName
      ? { [matchSheetName!]: result[matchSheetName!] }
      : result;
  }
}
