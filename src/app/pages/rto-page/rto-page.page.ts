/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-rto-page',
  templateUrl: './rto-page.page.html',
  styleUrls: ['./rto-page.page.scss'],
})
export class RtoPagePage implements OnInit {
  message: string;
  listData: any;
  pendingDone: any;
  pickup: any;
  userInfo: any;

  constructor(public alertController: AlertController,
              public navCtrl: NavController,
              public modalCtrl: ModalController,
              public httpService: HttpService) { }

  ngOnInit() {
    this.loadData();
  }
  ionViewWillEnter(){
    this.loadData();
  }
  openRtoUpdatePage(item){
    this.navCtrl.navigateForward('rto-update', {
      queryParams:{
        dataParams: item,
        listData: this.listData
      }
    });
  }

  loadData(){
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.httpService.get(`https://3plindia.com/3PL/api/ThreePL/getpodpending?vendor_code=${this.userInfo.Vendor_Code}`).then(resp=>{
      console.log(resp);
      this.pickup =resp.PickupDone;
      this.pendingDone = resp.Pending;
      this.listData = resp.getPodPendingData;
    });
  }

}
