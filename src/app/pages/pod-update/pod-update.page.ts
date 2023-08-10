/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
// import { PodComponent } from 'src/app/components/pod/pod.component';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-pod-update',
  templateUrl: './pod-update.page.html',
  styleUrls: ['./pod-update.page.scss'],
})
export class PodUpdatePage implements OnInit {
  message: string;
  select: any;
  listData: any;
  pickup: any;
  pendingDone: any;
  item: any = [];
  dataParams: any;
  userInfo: any;


  constructor(public alertController: AlertController,
              public navCtrl: NavController,
              public modalCtrl: ModalController,
              public httpService: HttpService) { }

  ngOnInit() {
    this.loadData();
  }
  ionViewDidEnter(){
    this.loadData();
  }

  openPodInnerPage(item){
    this.navCtrl.navigateForward('pod-inner', {
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
