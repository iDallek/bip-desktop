import * as XLSX from 'xlsx';

export default class ExcelService {
  static async readExcelFile(
    file: File
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

    workbook.SheetNames.forEach((sheetName: string) => {
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

    return result;
  }
}
