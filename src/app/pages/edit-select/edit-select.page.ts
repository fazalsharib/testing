/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable max-len */
/* eslint-disable prefer-const */
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController, NavController, PopoverController } from '@ionic/angular';
import { EditSelectModalComponent } from 'src/app/components/edit-select-modal/edit-select-modal.component';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-edit-select',
  templateUrl: './edit-select.page.html',
  styleUrls: ['./edit-select.page.scss'],
})
export class EditSelectPage implements OnInit {
  @ViewChild('popover') popover;

  isOpen = false;

  message: string;
  filterTerm: string;
  listData: any = [];
  pageData: any = [];
  awbNumber: string;
  selectedname: string;
  date: string;
  pickupSheetNo: string;
  userInfo: any;
  listData2: any;
  pickupBoyList: any;

  // listData = [];
  pendingDone: any;
  pickup: any;
  // filterTerm: string;
  selectableOrder: any = [];
  select: any = [];
  // userInfo: any;




  constructor(public alertController: AlertController,
              public navCtrl: NavController,
              public activeRoute: ActivatedRoute,
              public popoverController: PopoverController,
              public modalCtrl: ModalController,
              public httpService: HttpService) {}

  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));

  }


  // async removeItem(listData) {
  //   console.log(listData);

  //   const alert = await this.alertController.create({
  //     header: 'Shipment No = 987654321',
  //     subHeader: 'Are you sure want to remove?',
  //     buttons: [
  //             {
  //               text: 'Cancel',
  //               role: 'cancel',
  //               cssClass: 'alertCancel',
  //               handler: () => {
  //                 console.log('Confirm Cancel');
  //               }
  //             }, {
  //               text: 'Ok',
  //               role: 'confirm',
  //               cssClass: 'alertConfirm',
  //               handler: () => {
  //                 this.httpService.get('https://3plindia.com/3PL/Api/ThreePL/RemoveAWBNO?AWBNO='+listData.AwbNo+'&PickupSheetNo='+listData.PickupSheetNo+'&vendor_code='+ this.userInfo.Vendor_Code).then(resp=>{
  //                   console.log(resp);
  //                   this.ngOnInit();
  //                 });
  //               }
  //             }
  //           ]
  //   });

  //   await alert.present();
  // }


  // async presentPopover() {
  //   const popover = await this.popoverController.create({
  //     component: EditSelectModalComponent,
  //     cssClass: 'pop-over2',
  //     componentProps: {pageData: this.pageData}
  //   });
  //   await popover.present();
  //   const { role } = await popover.onDidDismiss();
  // }

  findBypickupSheetNo(){
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    console.log(this.userInfo.Vendor_Code);
    this.httpService.post(`https://3plindia.com/3PL/Api/ThreePL/SearchDataByPickupSheetNo?vendor_code=${this.userInfo.Vendor_Code}&PickupSheet=${this.pickupSheetNo}`,'').then(resp=>{
      console.log(resp,'koi mil gya....');
      this.listData = resp.ListDATA;
      this.pickup =resp.PickupDone;
      this.pendingDone = resp.Pending;
      this.listData = resp.ListDATA;
    });
  }

  addAwbNo(){
    // this.httpService.post('https://3plindia.com/3PL/api/ThreePL/SearchShipment?Customer=1364jus&AwbNo=10014','').then(resp=>{
    //   console.log(resp);
    // });
    let dataResp: any;
    dataResp = this.listData.filter(a=>a.AwbNo.toString() === this.awbNumber.toString());
    if(this.pageData.findIndex(a=>a.AwbNo.toString() === this.awbNumber.toString()) === -1 && dataResp){
      this.pageData.push(dataResp[0]);
    }
  }

  currentSelected = new Array(this.listData.length);
  handleClick(index: number, pickupBoyCode: string) {
    if(this.selectableOrder.indexOf(pickupBoyCode) === -1){
      this.selectableOrder.push(pickupBoyCode);
    } else if(this.selectableOrder.indexOf(pickupBoyCode) > -1){
      // eslint-disable-next-line @typescript-eslint/no-shadow
      let index = this.selectableOrder.indexOf(pickupBoyCode);
      this.selectableOrder.splice(index, 1);
    }
   this.currentSelected[index] = !!!this.currentSelected[index];
  }

  gotoNextPage(){
    this.select = [];
    for(let i=0; i<=this.selectableOrder.length; i++){
      let dataResp: any;
      dataResp = this.listData.filter(a=>a.OrderNo === this.selectableOrder[i]);
      if(dataResp[0] !== undefined){
        this.select.push(dataResp[0]);
      }
    }
    if(this.select.length > 0){
      this.navCtrl.navigateForward('edit', {
        queryParams:{
          dataParams: this.select,
          listData: this.listData
        }
      });
    }
  }
  }


