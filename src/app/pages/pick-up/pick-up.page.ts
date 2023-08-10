/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-pick-up',
  templateUrl: './pick-up.page.html',
  styleUrls: ['./pick-up.page.scss'],
})
export class PickUpPage implements OnInit {

  listData: any;
  pendingDone: any;
  pickup: any;
  userInfo: any;
  allData: any;


  constructor(public httpService: HttpService,
              public navCtrl: NavController) { }

  ngOnInit() {
    this.loadData();

  }
  ionViewDidEnter(){
    this.loadData();
    this.httpService.get('https://3plindia.com/3PL/api/ThreePL/GetVPickupData?Vendor_Code='+this.userInfo.Vendor_Code).then(resp=>{
      console.log(resp,'pending data');
      this.allData = resp.data[0];
      console.log(this.allData,'datalist......');
    });
  }
  loadData(){
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if(this.userInfo.UserType === 1){
      this.httpService.post(`https://3plindia.com/3PL/api/ThreePL/PickupPendingDataByPickupBoyV?vendor_code=${this.userInfo.Vendor_Code}`,'').then(resp=>{
        console.log(resp,'vendor data');
        this.pickup =resp.PickupDone;
        this.pendingDone = resp.Pending;
        this.listData = resp.ListDATA;
      });
    }
    else{
      this.httpService.post(`https://3plindia.com/3PL/api/ThreePL/PickupPendingDataByPickupBoyE?vendor_code=${this.userInfo.Vendor_Code}&username=${this.userInfo.Username}`,'').then(resp=>{
      console.log(resp,'employee data');
      this.pickup =resp.PickupDone;
      this.pendingDone = resp.Pending;
      this.listData = resp.ListDATA;
    });
  }

  }
  // pickupDone(){
  //   this.navCtrl.navigateForward('pickup-done');
  // }
  pickupDone(listData){
    console.log(listData,'jhgjhkfazal');
    this.navCtrl.navigateForward('pickup-done', {
      queryParams:{
        dataParams: listData,
        listData: this.listData
      }
    });
  }

  openProfile(){
    this.navCtrl.navigateForward('profile');
  }
  openDashboard(){
    this.navCtrl.navigateForward('dasboard');
  }

}
