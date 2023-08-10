/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable max-len */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/quotes */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { PortService } from 'src/app/services/port.service';
import { AlertController, NavController, NavParams, PopoverController } from '@ionic/angular';
import { SearchComponent } from 'src/app/components/search/search.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.page.html',
  styleUrls: ['./delete.page.scss'],
  providers: [DatePipe]
})
export class DeletePage implements OnInit {
  pickupSheetNo: any;
  form: FormGroup;
  isItemAvailable = false;
  items = [];
  listData = [];
  listData2 = [];
  pendingDone: any;
  pickup: any;
  filterTerm: string;
  date: any;

  deletableOrder: any = [];
  pickupBoyList: any;
  pageData: any;
  orderNos: any = [];
  selectedData: any;
  selectedname: any;

  isenabled = true;
  awbNumber: string;
  userInfo: any;

  constructor(public httpService: HttpService,
              public fb: FormBuilder,
              public portService: PortService,
              public popover: PopoverController,
              public navParams: NavParams,
              public datePipe: DatePipe,
              public alertController: AlertController,
              public navctrl: NavController
              ) {
                this.pageData = this.navParams.get('pageData');
                for( let i=0; i<this.pageData; i++){
                  console.log(this.pageData[i]);
                  this.orderNos.push(Number(this.pageData[i].OrderNo));
                }
                console.log(this.orderNos);
              }

  ngOnInit() {
    this.initializeItems();
  }

  ionViewDidEnter(){
    this.currentSelected = [];
    this.initializeItems();
  }

  initializeItems(){
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.httpService.get('https://3plindia.com/3PL/api/ThreePL/GetPickupBoyList?vendor_code='+this.userInfo.Vendor_Code).then(resp=>{
    this.pickupBoyList = resp.PickupBoyList;
    });
  }

  currentSelected = new Array(this.listData.length);
  handleClick(index: number, pickupBoyCode: string) {
    if(this.deletableOrder.indexOf(pickupBoyCode) === -1){
      this.deletableOrder.push(pickupBoyCode);
    } else if(this.deletableOrder.indexOf(pickupBoyCode) > -1){
      let index = this.deletableOrder.indexOf(pickupBoyCode);
      this.deletableOrder.splice(index, 1);
    }
   this.currentSelected[index] = !!!this.currentSelected[index];
  }


  async openSearch(){
    const popover = await this.popover.create({
      component: SearchComponent,
      componentProps: {pickupBoy: this.pickupBoyList, seleteddata: this.selectedData}
    });
    await popover.present();
    await popover.onDidDismiss().then(resp=>{
      this.selectedData = resp.data.PickupBoyCode;
      this.selectedname = resp.data.PickupName;
    });
  }

  searchData(event){
    let selectedDate = new Date();
    selectedDate = new Date(event.target.value);
    console.log(selectedDate);
    this.date = this.datePipe.transform(selectedDate, 'yyyy-MM-dd');
    console.log(this.date);
  }


  findByDate(){
    this.pickupSheetNo = '';
    this.selectedname = '';
    this.httpService.post(`https://3plindia.com/3PL/Api/ThreePL/SearchDataByPickupDate?vendor_code=${this.userInfo.Vendor_Code}&PickupDate=`+this.date,'').then(resp=>{
      console.log(resp);
      this.listData2 = resp.ListDATA;
    });
  }

  findBypickupSheetNo(){
    this.selectedname = '';
    this.date = '';
    this.httpService.post(`https://3plindia.com/3PL/Api/ThreePL/SearchDataByPickupSheetNo?vendor_code=${this.userInfo.Vendor_Code}&PickupSheet=`+this.pickupSheetNo,'').then(resp=>{
      console.log(resp);
      this.listData2 = resp.ListDATA;
    });
  }

  findPickupBoyList(event){
    this.pickupSheetNo = '';
    this.date = '';
    // let obj = {
    //   Customer: '1364Jus',
    //   PickupBoy: this.selectedname
    // };
    // this.httpService.post(`https://3plindia.com/3PL/Api/ThreePL/SearchDataByPickupBoy?Customer=${this.selectedData}&PickupBoy=${this.selectedname}`,this.selectedname).then(resp=>{
    this.httpService.post(`https://3plindia.com/3PL/Api/ThreePL/SearchDataByPickupBoy?vendor_code=${this.userInfo.Vendor_Code}&PickupBoy=${this.selectedname}`,'').then(resp=>{
      console.log(resp);
      this.listData2 = resp.ListDATA;
    });
  }


  deleteRecord(){
    if(this.date){
      console.log(this.date);
      this.httpService.post(`https://3plindia.com/3PL/Api/ThreePL/DelDataByPickupSheetDate?vendor_code=${this.userInfo.Vendor_Code}&PickupDate=`+this.date,'').then(resp=>{
        console.log(resp);
        this.presentAlert(resp.message);
        this.navctrl.navigateRoot('pickup-order');
        // this.navctrl.navigateBack('pickup-order');
        this.ngOnInit();
      });
    }
    else if(this.selectedname){
      console.log(this.selectedname);
      this.httpService.post(`https://3plindia.com/3PL/Api/ThreePL/DelDataByPickupBoy?vendor_code=${this.userInfo.Vendor_Code}&PickupBoy=`+this.selectedname,'').then(resp=>{
        console.log(resp);
        this.presentAlert(resp.message);
        this.navctrl.navigateRoot('pickup-order');
        // this.navctrl.navigateBack('pickup-order');
        this.ngOnInit();
      });
    }
    else if(this.pickupSheetNo){
      console.log(this.pickupSheetNo);
      this.httpService.post(`https://3plindia.com/3PL/Api/ThreePL/DelDataByPickupSheet?vendor_code=${this.userInfo.Vendor_Code}&PickupSheet=`+this.pickupSheetNo,'').then(resp=>{
        console.log(resp);
        this.presentAlert(resp.message);
        this.navctrl.navigateRoot('pickup-order');
        // this.navctrl.navigateBack('pickup-order');
        this.ngOnInit();
      });
    }
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

