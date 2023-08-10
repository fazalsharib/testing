/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, NavParams, PopoverController } from '@ionic/angular';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-edit-rate',
  templateUrl: './edit-rate.component.html',
  styleUrls: ['./edit-rate.component.scss'],
})
export class EditRateComponent implements OnInit {
  modes: any;
  origins: any;
  destinations: any;
  selectedOrigins: any;
  selectedDestinations: any;
  selectedModes: any;
  selectRate: any;
  selectFreightWeight: any;
  selectedTAT: any;
  userInfo: any;
  activeDate: any;
  closingDate: any;
  selectFreightCharges: any;
  pageData: any;


  tats = [
    {days: 1 },
    {days: 2 },
    {days: 3 },
    {days: 4 },
    {days: 5 },
    {days: 6 },
    {days: 7 },
    {days: 8 },
    {days: 9 },
    {days: 10 },
  ];

  constructor(public httpService: HttpService,
              public navCtrl: NavController,
              public popoverController: PopoverController,
              public alertController: AlertController,
              public navParams: NavParams) {
                this.pageData = this.navParams.get('pageData');
                console.log(this.pageData);
              }

  ngOnInit() {
    this.modes = [];
    this.httpService.get('https://3plindia.com/3PL/Api/ThreePL/GetMode').then(resp=>{
      this.modes = resp.data;
    });

    this.origins = [];
    this.httpService.get('https://3plindia.com/3PL/Api/ThreePL/GetDestination').then(resp=>{
      this.origins = resp.data;
    });

    this.destinations = [];
    this.httpService.get('https://3plindia.com/3PL/Api/ThreePL/GetDestination').then(resp=>{
      this.destinations = resp.data;
    });
  }


  onSubmit(){
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    console.log(this.userInfo.Vendor_Code);
    let obj = {
      Vendor_Code: this.userInfo.Vendor_Code,
      mode_code: this.selectedModes,
      orgin_code: this.selectedOrigins,
      destination_code: this.selectedDestinations,
      Active_Date: this.activeDate,
      Closing_Date: this.closingDate,
      rateperkg: this.selectRate,
      MinFreightWt: this.selectFreightWeight,
      MinFreightAmt: this.selectFreightCharges,
      TATDays: this.selectedTAT,
      ClubNo: this.pageData.ClubNo
    };
    this.httpService.post('https://3plindia.com/3pl/api/Threepl/ModifyVRate',obj).then(resp=>{
      console.log(resp,'data show');
      this.presentAlert(resp.message);
      this.popoverController.dismiss();
      this.navCtrl.navigateRoot('ratepage');
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

    cancel() {
      this.popoverController.dismiss();
    }

}
