import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
    providedIn: 'root' // <-- Thêm dòng này để Angular tự động cung cấp service
  })
export class ExcelReaderService {
  /**
   * Đọc file Excel và chuyển dữ liệu thành JSON
   * @param file File cần đọc
   * @returns Promise chứa dữ liệu dưới dạng mảng JSON
   */
  readExcelFile(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event: any) => {
        try {
          const data = new Uint8Array(event.target.result);
          const workbook = XLSX.read(data, { type: 'array' });

          // Lấy sheet đầu tiên
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];

          // Chuyển sheet thành JSON
          const jsonData = XLSX.utils.sheet_to_json(sheet);
          resolve(jsonData);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  }
}
