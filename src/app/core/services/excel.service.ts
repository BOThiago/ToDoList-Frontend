import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  constructor() {}

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    worksheet['A1'] = '';
    worksheet['B1'] = '';
    worksheet['C1'] = '';

    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveAsFile(excelBuffer, excelFileName, 'xlsx');
  }

  public exportAsCsvFile(json: any[], csvFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    worksheet['A1'] = '';
    worksheet['B1'] = '';
    worksheet['C1'] = '';

    const csvBuffer: any = XLSX.utils.sheet_to_csv(worksheet);
    this.saveAsFile(
      new Blob([csvBuffer], { type: CSV_TYPE }),
      csvFileName,
      'csv'
    );
  }

  private saveAsFile(buffer: any, fileName: string, fileType: string): void {
    const data: Blob = new Blob([buffer], {
      type: fileType === 'xlsx' ? EXCEL_TYPE : CSV_TYPE,
    });
    const link: HTMLAnchorElement = document.createElement('a');
    const url: string = window.URL.createObjectURL(data);
    link.href = url;
    link.download = `${fileName}.${fileType}`;
    link.click();
    window.URL.revokeObjectURL(url);
  }
}

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const CSV_TYPE = 'text/csv;charset=utf-8;';
