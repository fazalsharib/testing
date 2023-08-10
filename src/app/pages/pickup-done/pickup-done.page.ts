/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-pickup-done',
  templateUrl: './pickup-done.page.html',
  styleUrls: ['./pickup-done.page.scss'],
})
export class PickupDonePage implements OnInit {

  name: any;
  listData: any = [];
  params: any = [];
  pendingDone: any;
  pickup: any;
  pageData: any = [];
  item: any;
  navParams: any = [];
  status: any;
  statusDate: any;
  statusTime: any;
  reason: any;
  remark: any;

  isShown: boolean = false ;

  selectedStatus: any;
  selectedReason: any;
  statuses = [
      { id: 1, name: 'Cancel' },
      { id: 2, name: 'Confirm' },
  ];
  reasons = [
    { id: 1, name: 'Pickup Address is not proper' },
    { id: 2, name: 'Delay from the outsider' },
  ];

  constructor(public navCtrl: NavController,
              public activeRoute: ActivatedRoute,
              public modalCtrl: ModalController,
              public httpService: HttpService,
              public alertController: AlertController)
              {
                this.activeRoute.queryParams.subscribe(resp=>{
                  console.log(resp,'you');
                  this.pageData = resp.listData;
                  this.listData = resp.dataParams;
                });
                console.log(this.listData);
              }

  ngOnInit() {}

  cancel(){
    this.navCtrl.navigateRoot('pick-up');
  }

  confirm() {
    let obj = {
      // AwbNo: this.listData.AwbNo,
      // PickupSheetNo: this.listData.PickupSheetNo,
      // Pickup_Generate_Date: this.listData.Pickup_Generate_Date,
      awbno: this.listData.AwbNo,
      status: this.status,
      PickupDoneDate: this.statusDate,
      PickupDoneTime: this.statusTime,
      reason: this.reason,
      receRemark: this.remark,
    };
    console.log(obj,'joker');
    this.httpService.post('https://3plindia.com/3PL/Api/ThreePL/PickupDone', obj).then(resp=>{
      if(resp.status === 0){
        this.presentAlert(resp.message);
        this.navCtrl.navigateRoot('pick-up');
        this.ngOnInit();
        this.ionViewDidEnter();
      }else{
        resp.message = 'Something went wrong';
      }
    });
  }
  ionViewDidEnter() {
    throw new Error('Method not implemented.');
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

