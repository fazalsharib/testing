/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-e-wallet',
  templateUrl: './e-wallet.page.html',
  styleUrls: ['./e-wallet.page.scss'],
})
export class EWalletPage implements OnInit {

  userInfo: any;
  walletData: any;
  printType: boolean = true;
  invoiceType: boolean = false;
  transactionType: boolean = false;
  orderType: boolean = false;
  transData: any;
  orderData: any;
  customerCode: any;
  type: any;
  threeplInvoiceType: any;

  constructor(public httpService: HttpService,
              public navCtrl: NavController,
              public alertController: AlertController)
              {
                this.type = 'Print';
               }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev.detail.value);
      if(ev.detail.value === 'Print'){
        this.printType = true;
        this.invoiceType = false;
        this.transactionType = false;
        this.threeplInvoiceType = false;
      }
      else if(ev.detail.value === 'Transactions'){
        this.transactionType = true;
        this.printType = false;
        this.invoiceType = false;
        this.threeplInvoiceType = false;
      }
      else if(ev.detail.value === 'Invoice'){
        this.transactionType = false;
        this.printType = false;
        this.invoiceType = true;
        this.threeplInvoiceType = false;
      }
      else{
        this.invoiceType = false;
        this.printType = false;
        this.transactionType = false;
        this.threeplInvoiceType = true;
      }
  }

  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    console.log(this.userInfo);
    this.httpService.get('https://3plindia.com/3PL/api/ThreePL/GetTransactionVendorHistory?Vendor_Code='+this.userInfo.Vendor_Code).then(resp=>{
      console.log(resp,'hiiiii');
      this.walletData = resp.data;
      console.log(this.walletData,'just');
    });
  }

  async printItem(item) {
    const alert = await this.alertController.create({
      header: 'Order Number = ' + item.OrderNo,
      subHeader: 'Are you sure want to Print?',
      buttons: [
              {
                text: 'NO',
                role: 'cancel',
                cssClass: 'alertCancel',
                handler: () => {
                  console.log('Confirm Cancel');
                }
              },
              {
                text: 'YES',
                role: 'confirm',
                cssClass: 'alertConfirm',
                handler: () => {
                  this.httpService.get('https://3plindia.com/3PL/api/ThreePL/GetCustInv?OrderNo=' + item.OrderNo ).then(resp=>{
                    console.log(resp);
                    if(resp.status === 0){
                      this.navCtrl.navigateForward('print',{
                        queryParams:{
                          dataParams: resp.data,
                        }
                      });
                    }
                  });
                }
              }
            ]
    });

    await alert.present();
  }

  async printInvoiceItem(item) {
    const alert = await this.alertController.create({
      header: 'Order Number = ' + item.OrderNo,
      subHeader: 'Are you sure want to Print?',
      buttons: [
              {
                text: 'NO',
                role: 'cancel',
                cssClass: 'alertCancel',
                handler: () => {
                  console.log('Confirm Cancel');
                }
              },
              {
                text: 'YES',
                role: 'confirm',
                cssClass: 'alertConfirm',
                handler: () => {
                  this.httpService.get('https://3plindia.com/3PL/api/ThreePL/GetCustInv?OrderNo='+ item.OrderNo  ).then(resp=>{
                    console.log(resp);
                    if(resp.status === 0){
                      this.navCtrl.navigateForward('invoice-print',{
                        queryParams:{
                          dataParams: resp.data,
                        }
                      });
                    }
                  });
                }
              }
            ]
    });

    await alert.present();
  }

  async print3plInvoiceItem(item) {
    const alert = await this.alertController.create({
      header: 'Order Number = ' + item.OrderNo,
      subHeader: 'Are you sure want to Print?',
      buttons: [
              {
                text: 'NO',
                role: 'cancel',
                cssClass: 'alertCancel',
                handler: () => {
                  console.log('Confirm Cancel');
                }
              },
              {
                text: 'YES',
                role: 'confirm',
                cssClass: 'alertConfirm',
                handler: () => {
                  this.navCtrl.navigateForward('threepl-invoice');
                }
              }
            ]
    });

    await alert.present();
  }

}
