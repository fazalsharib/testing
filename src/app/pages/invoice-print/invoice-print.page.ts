/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/quotes */
import { Component, OnInit } from '@angular/core';
// import { Printer, PrintOptions } from '@awesome-cordova-plugins/printer/ngx';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invoice-print',
  templateUrl: './invoice-print.page.html',
  styleUrls: ['./invoice-print.page.scss'],
})
export class InvoicePrintPage implements OnInit {

  pdfOjb = null;
  content: string;
  pageData: any;
  companyLogo: any;
  listData: any;
  shipper: any;
  consignee: any;
  customer: any;

  constructor(private pdfGenerator: PDFGenerator,
              public activeRoute: ActivatedRoute)
              {
                this.activeRoute.queryParams.subscribe(resp=>{
                  this.pageData = resp.dataParams;
                  this.listData = this.pageData[0];
                  this.companyLogo = 'data:image/jpeg;base64,' + this.pageData[0].CompanyLogo;
                  this.shipper = this.pageData[0].Shipper[0];
                  this.consignee = this.pageData[0].Consignee[0];
                  this.customer = this.pageData[0].Customer[0];
                  console.log(this.shipper);
                  console.log(this.pageData);
                });
              }


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
