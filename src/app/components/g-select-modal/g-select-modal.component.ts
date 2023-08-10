/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/prefer-for-of */
import { Component, OnInit } from '@angular/core';
import { PopoverArrowDirection } from '@awesome-cordova-plugins/camera';
import { AlertController, ModalController, NavController, NavParams, PopoverController } from '@ionic/angular';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-g-select-modal',
  templateUrl: './g-select-modal.component.html',
  styleUrls: ['./g-select-modal.component.scss'],
})
export class GSelectModalComponent implements OnInit {
  name: string;
  pickupBoyList: any;
  pickupCode: number;
  remarks: string;
  pageData: any;
  awbNos: any = [];
  userInfo: any;


  constructor(public modalCtrl: ModalController,
              public popoverController: PopoverController,
              public httpService: HttpService,
              public navParams: NavParams,
              public alertController: AlertController,
              public navctrl: NavController)
              {
                this.pageData = this.navParams.get('pageData');
                for( let i=0; i<this.pageData.length; i++){
                  console.log(this.pageData[i]);
                  this.awbNos.push({awbno: this.pageData[i].AwbNo});
                }
                console.log(this.awbNos);
              }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.httpService.get('https://3plindia.com/3PL/api/ThreePL/GetPickupBoyList?vendor_code='+this.userInfo.Vendor_Code).then(resp=>{
    console.log(resp.PickupBoyList[0].PickupBoyCode);
    this.pickupBoyList = resp.PickupBoyList;
    });
  }


  confirm() {
    let obj = {
      PickupBoy: this.pickupCode,
      Remark: this.remarks,
      //AwbNo: JSON.stringify(this.awbNos),
      GetAwbNoList: this.awbNos,
      Vender_code: this.userInfo.Vendor_Code,
      PickupDate: new Date(),
    };
    console.log(obj);
    console.log(this.userInfo,'hisssssss');
    this.httpService.post('https://3plindia.com/3PL/api/ThreePL/PickupGenerate',obj).then(resp=>{
      if(resp.status === 0){
        this.presentAlert(resp.message);
        this.popoverController.dismiss(this.name, 'confirm');
        this.navctrl.navigateRoot('generate-pickup');
        // this.navctrl.navigateBack('pickup-order');
        this.ngOnInit();
      }else{
        resp.message = 'Something went wrong';
      }
    });
  }

  cancel() {
    this.popoverController.dismiss();
  }

  pickupBoyValue(event){
    this.pickupCode = event.target.value;
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
