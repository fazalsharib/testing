/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
// import { Printer } from '@awesome-cordova-plugins/printer/ngx';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';

@Component({
  selector: 'app-threepl-invoice',
  templateUrl: './threepl-invoice.page.html',
  styleUrls: ['./threepl-invoice.page.scss'],
})
export class ThreeplInvoicePage implements OnInit {

  pdfOjb = null;
  content: string;

  constructor(private pdfGenerator: PDFGenerator) { }

  ngOnInit() {
  }

  // pdfDownload(){
  //   this.printer.isAvailable().then(onSuccess, onError);
  //   let options: PrintOptions = {
  //         name: 'MyDocument',
  //         duplex: true,
  //         orientation: 'landscape',
  //         monochrome: true
  //   };
  //   this.printer.print('PrintInvoice', options).then(onSuccess, onError);
  // }

  downloadInvoice() {
    this.content = document.getElementById('PrintInvoice').innerHTML;
    let options = {
      documentSize: 'A4',
      type: 'share',
      // landscape: 'portrait',
      fileName: 'Order-Invoice.pdf'
    };
    this.pdfGenerator.fromData(this.content, options)
      .then((base64) => {
        console.log('OK', base64);
      }).catch((error) => {
        console.log('error', error);
      });

  }
}
