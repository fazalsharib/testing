/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController, ToastController } from '@ionic/angular';
import { ServiceLocatorComponent } from 'src/app/components/service-locator/service-locator.component';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.page.html',
  styleUrls: ['./dasboard.page.scss'],
})
export class DasboardPage implements OnInit {

  userInfo: any;
  userType: any;
  datalist: any;
  docketNo: any;
  docResp: any;
  podData: any;
  show: boolean = false;

  constructor(public navCtrl: NavController,
              public httpService: HttpService,
              public toastController: ToastController,
              public popoverController: PopoverController) { }

  ngOnInit() {

    setTimeout(() => {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
      console.log(this.userInfo,'mnbhu');
      console.log(this.userInfo.Vendor_Name);
      this.userType = this.userInfo.UserType;
        if(!this.userInfo){
          this.navCtrl.navigateForward('login');
        }
        }, 500);
        this.loadData();
  }

  goToPickuppage(){
    this.navCtrl.navigateForward('pick-up');
  }
  gotoPickupOrder(){
    this.navCtrl.navigateForward('pickup-order');
  }
  goToPodpage(){
    this.navCtrl.navigateForward('pod-update');
  }
  goToRtopage(){
    this.navCtrl.navigateForward('rto-page');
  }
  openReports(){
    this.navCtrl.navigateForward('reports');
  }
  openWallet(){
    this.navCtrl.navigateForward('e-wallet');
  }
  openRates(){
    this.navCtrl.navigateForward('ratepage');
  }
  openOtherChanges(){
    this.navCtrl.navigateForward('others-changespage');
  }
  loadData(){
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.httpService.get('https://3plindia.com/3PL/api/ThreePL/GetDashBoardV?Vendor_Code='+this.userInfo.Vendor_Code).then(resp=>{
      this.datalist = resp.data;
    });
  }

  openProfile(){
    this.navCtrl.navigateForward('profile');
  }

  findDocketNo(){
    this.httpService.get('https://3plindia.com/3PL/api/ThreePL/GetTrackResult?awbno=' + this.docketNo).then(resp=>{
      console.log(resp);
      // if(resp.data[0].AWBNo === this.docketNo ){
      //   this.docResp =  resp.data[0];
      //   this.podData =  resp.data[0].POD;
      //   this.show = true;
      // }
      // else{
      //   this.show = false;
      // }
      if(resp.data[0].AWBNo === this.docketNo){
        this.navCtrl.navigateForward('tracking', {
          queryParams:{
            dataParams: resp.data[0],
          }
        });
      }else {
        alert(resp.message);
      }
    });
  }

  async presentToast(responceMessage) {
    const toast = await this.toastController.create({
      message: responceMessage,
      duration: 2000,
      icon: 'information-circle',
      position: 'top',
    });
    toast.present();
  }
}
