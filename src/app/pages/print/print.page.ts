/* eslint-disable max-len */
/* eslint-disable prefer-const */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { ActivatedRoute } from '@angular/router';
import * as JsBarcode from 'jsbarcode';

@Component({
  selector: 'app-print',
  templateUrl: './print.page.html',
  styleUrls: ['./print.page.scss'],
})
export class PrintPage implements OnInit {

  @ViewChild('barcode') barcode: ElementRef;
  @ViewChild('barcodeOrder') barcodeOrder: ElementRef;
  barname: any;

  content: string;
  pageData: any;
  listData: any;
  companyLogo: any;
  shipper: any;
  consignee: any;

  constructor(private pdfGenerator: PDFGenerator,
              public activeRoute: ActivatedRoute)
              {
                this.activeRoute.queryParams.subscribe(resp=>{
                  this.pageData = resp.dataParams;
                  this.listData = this.pageData[0];
                  this.companyLogo = 'data:image/jpeg;base64,' + this.pageData[0].CompanyLogo;
                  this.shipper = this.pageData[0].Shipper[0];
                  this.consignee = this.pageData[0].Consignee[0];
                  console.log(this.shipper);
                  console.log(this.pageData);
                });
               }

  ngOnInit() {
      setTimeout(() => {
        JsBarcode(this.barcode.nativeElement, this.listData.Awbno,{
          format:'CODE128',
        });
      }, 500);
      setTimeout(() => {
        JsBarcode(this.barcodeOrder.nativeElement, this.listData.orderNo,{
          format:'CODE128',
        });
      }, 500);
  }

  // geraBarCode(){
  //   JsBarcode(this.barcode.nativeElement, this.barname,{
  //          format:'CODE128',
  //        });
  //     }

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
