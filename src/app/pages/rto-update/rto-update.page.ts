/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-rto-update',
  templateUrl: './rto-update.page.html',
  styleUrls: ['./rto-update.page.scss'],
})
export class RtoUpdatePage implements OnInit {
  name: any;
  listData: any = [];
  params: any = [];
  pendingDone: any;
  pickup: any;
  receiver: any;
  deliveryProof: any;
  // remarks: any;
  contactNo: number;
  companyName: 'xyz';
  remarks: any;
  pageData: any = [];
  item: any;
  navParams: any = [];
  uploadSign: any;
  uploadImage: any;
  date: any;
  reason: any;
  uploadProof: any;
  reasons: any = [];
  selectedReason: any;
  selectedStatus: any;
  status: any = [];

  statuses = [
      {id: 1, name: 'Undelivered'},
      {id: 2, name: 'RTO'},
  ];

  constructor(public navctrl: NavController,
              public activeRoute: ActivatedRoute,
              public modalCtrl: ModalController,
              public httpService: HttpService,
              public alertController: AlertController)
              {
                this.activeRoute.queryParams.subscribe(resp=>{
                  this.pageData = resp.listData;
                  this.listData = resp.dataParams;
                });
              }

  ngOnInit() {
    this.reasons = [];
    this.httpService.get('https://3plindia.com/3PL/Api/ThreePL/GetReason').then(resp=>{
      this.reasons = resp;
    });
  }

  cancel(){
    this.navctrl.navigateBack('rto-page');
  }

  confirm() {
    let obj = {
      awbno: this.listData.AWBNumber,
      status: this.selectedStatus,
      Date: this.date,
      reason: this.selectedReason,
      UploadProof: this.uploadProof
    };
    this.httpService.post('https://3plindia.com/3PL/Api/ThreePL/UpdateRunSheet', obj).then(resp=>{
      console.log(resp);
      if(resp.status === 0){
        this.presentAlert(resp.message);
        this.navctrl.navigateBack('rto-page');
      }else{
        resp.message = 'Something went wrong';
      }
    });
  }

  async presentAlert(responceMessage) {
    const alert = await this.alertController.create({
      header: 'Message',
      message: responceMessage,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
