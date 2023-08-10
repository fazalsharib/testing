/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable object-shorthand */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AlertController, PopoverController } from '@ionic/angular';
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { NavController } from '@ionic/angular';
import { EditRateComponent } from 'src/app/components/edit-rate/edit-rate.component';

@Component({
  selector: 'app-ratepage',
  templateUrl: './ratepage.page.html',
  styleUrls: ['./ratepage.page.scss'],
})
export class RatepagePage implements OnInit {

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
  type: any;
  rateType: boolean = true;
  modifyType: boolean = false;
  deleteType: boolean = false;
  orderData: any;
  allRate: any;
  selectedModifyOrigins: any;
  selectedModifyDestinations: any;
  searchData: any;
  selectedDeletedOrigins: any;
  selectedDeletedDestinations: any;

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
item: any;

  // handleRefresh(event) {
  //   setTimeout(() => {
  //     this.ngOnInit();
  //     // Any calls to load data go here
  //     event.target.complete();
  //   }, 2000);
  // };


  constructor(public httpService: HttpService,
              public navCtrl: NavController,
              public popoverController: PopoverController,
              public alertController: AlertController) {
                this.type = 'Rate';
              }

  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.allRateData();
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

  segmentChanged(ev: any) {
    console.log('Segment changed', ev.detail.value);
      if(ev.detail.value === 'Rate'){
        this.rateType = true;
        this.modifyType= false;
        this.deleteType= false;
      }
      else if(ev.detail.value === 'ModifyRate'){
        this.modifyType= true;
        this.rateType = false;
        this.deleteType= false;
      }
      else{
        this.deleteType= true;
        this.rateType = false;
        this.modifyType= false;
      }
  }

  allRateData(){
    this.httpService.get('https://3plindia.com/3pl/api/Threepl/GetVendorAllRate?Vendor_Code=' + this.userInfo.Vendor_Code).then(resp=>{
      console.log(resp);
      this.allRate = resp.data;
      console.log(this.allRate);

    });
  }

  // modifySearch(){
  //   let obj = {
  //     Vendor_Code: this.userInfo.Vendor_Code,
  //     orgin_code: this.selectedModifyOrigins,
  //     destination_code: this.selectedModifyDestinations,
  //   };
  //   this.httpService.get('https://3plindia.com/3pl/api/Threepl/GetVendorLoc'+ obj).then(resp=>{
  //     console.log(resp);
  //     this.searchData = resp.data;
  //     alert(resp.message);
  //   });
  // }

  modifySearch(){
    this.httpService.get('https://3plindia.com/3pl/api/Threepl/GetVendorLoc?orgin_code= '+ this.selectedModifyOrigins + '&destination_code='+ this.selectedModifyDestinations+'&Vendor_Code=' + this.userInfo.Vendor_Code).then(resp=>{
      console.log(resp);
      this.searchData = resp.data;
      alert(resp.message);
    });
  }

  deleteDataSearch(){
    this.httpService.get('https://3plindia.com/3pl/api/Threepl/GetVendorLoc?orgin_code= '+ this.selectedDeletedOrigins +'&destination_code='+ this.selectedDeletedDestinations +'&Vendor_Code=' + this.userInfo.Vendor_Code).then(resp=>{
      console.log(resp);
      this.searchData = resp.data;
      alert(resp.message);
    });
  }

  onSubmit(){
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    console.log(this.userInfo.Vendor_Code);
    let obj = {
      Vendor_Code: this.userInfo.Vendor_Code,
      Mode_Code: this.selectedModes,
      Orgin_Code: this.selectedOrigins,
      Destination_Code: this.selectedDestinations,
      Active_Date: this.activeDate,
      Closing_Date: this.closingDate,
      RatePerKG: this.selectRate,
      Weight: this.selectFreightWeight,
      MinFreightAmt: this.selectFreightCharges,
      TAT_Days: this.selectedTAT
    };
    this.httpService.post('https://3plindia.com/3pl/api/Threepl/PostRate',obj).then(resp=>{
      console.log(resp,'data show');
      this.presentAlert(resp.message);
      this.navCtrl.navigateBack('dasboard');
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

    // loadOrderData(){
    //   this.httpService.get('https://3plindia.com/3PL/Api/ThreePL/GetOrderHistory?Cust_Code='+this.customerCode).then(resp=>{
    //     console.log(resp);
    //     this.orderData = resp.data;
    //     console.log(this.orderData);
    //   });
    // }

    async removeItem(item) {
      const alert = await this.alertController.create({
        // header: 'CLUB NUMBER = ' + item.ClubNo,
        header: 'Origin = ' + item.orginname +'' +'       Destination = ' + item.destination_name,
        subHeader: 'Are you want to delete this rate?',
        buttons: [
                {
                  text: 'Cancel',
                  role: 'cancel',
                  cssClass: 'alertCancel',
                  handler: () => {
                    console.log('Confirm Cancel');
                  }
                },
                {
                  text: 'Confirm',
                  role: 'confirm',
                  cssClass: 'alertConfirm',
                  handler: () => {
                    let obj = {
                      // Vendor_Code: this.userInfo.Vendor_Code,
                      // ClubNo: this.item.ClubNo,
                    };
                    this.httpService.post('https://3plindia.com/3pl/api/Threepl/VRateDelete?Vendor_Code=' + this.userInfo.Vendor_Code + '&ClubNo=' + item.ClubNo, obj).then(resp=>{
                      console.log(resp);
                      this.Alert(resp.message);
                      this.allRateData();
                    });
                  }
                }
              ]
      });
      await alert.present();
    }

    async presentPopover(item) {
      console.log(item);
      const popover = await this.popoverController.create({
        component: EditRateComponent,
        cssClass: 'pop-over2',
        showBackdrop:false,
        componentProps: {pageData: item}
      });
      await popover.present();
    }

    async Alert(responceMessage) {
      const alert = await this.alertController.create({
        header: 'Message',
        message: responceMessage,
        buttons: ['OK'],
      });
      await alert.present();
    }

}
