import { Injectable } from '@angular/core';
import { FileTransfer } from './fileTransfer.interface';

@Injectable({
  providedIn: 'root'
})
export class FiletransferService {
  
  public downloadFile(file: FileTransfer) {
    const bytes = this.BytesfromBase64(file.base64)
    const blob = new Blob([bytes.buffer], { type: file.mimeType });
    const fileUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = file.fileName;
    link.click();
  }


  public BytesfromBase64(base64: string): Uint8Array<ArrayBuffer> {
    const bytesString = atob(base64);
    const len = bytesString.length
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = bytesString.charCodeAt(i);
    }
    return bytes
  }
}
