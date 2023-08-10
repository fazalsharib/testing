/* eslint-disable max-len */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { NgSelectConfig } from '@ng-select/ng-select';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-pod-inner',
  templateUrl: './pod-inner.page.html',
  styleUrls: ['./pod-inner.page.scss'],
})
export class PodInnerPage implements OnInit {

  name: any;
  listData: any = [];
  params: any = [];
  pendingDone: any;
  pickup: any;
  receiver: any;
  deliveryProof: any;
  contactNo: number;
  companyName: 'xyz';
  remarks: any;
  pageData: any = [];
  item: any;
  navParams: any = [];
  uploadSign: any;
  uploadImage: any;
  proof: any = [];
  userInfo:any;

  prooves = [
    {id: 1, name: 'Sign Only'},
    {id: 2, name: 'Sign with Number'},
    {id: 3, name: 'Sign with Stamp'},
    {id: 4, name: 'Stamp only'},
  ];
  signatureImg: string;

  constructor(public navCtrl: NavController,
              public activeRoute: ActivatedRoute,
              public modalCtrl: ModalController,
              public httpService: HttpService,
              private config: NgSelectConfig,
              public alertController: AlertController)
              {
                this.activeRoute.queryParams.subscribe(resp=>{
                  this.pageData = resp.listData;
                  this.listData = resp.dataParams;
                });
              }

  ngOnInit() {
    this.userInfo = JSON.stringify(localStorage.getItem('userInfo'));
    console.log(this.userInfo,'gooddd');
  }



  reset(){
    this.navCtrl.navigateRoot('pod-update');
  }

  confirm() {
    if(this.receiver){
      let obj = {
        awbno: this.listData.AWBNumber,
        status: 'Delivered',
        receName: this.receiver,
        receNumber: this.contactNo,
        sign: this.deliveryProof,
        receRemark: this.remarks,
        signImage: 'data:image/jpeg;base64,' +'@'+this.signatureImg,
        podImage: 'data:image/jpeg;base64,' +'@'+this.uploadImage

      };
      console.log(obj,'joker');
      this.httpService.post('https://3plindia.com/3PL/Api/ThreePL/UpdateRunSheet', obj).then(resp=>{
        console.log(resp);
        if(resp.status === 0){
          this.presentAlert(resp.message);
          this.navCtrl.navigateBack('pod-update');
        }else{
          resp.message = 'Something went wrong';
        }
      });
    }else{
      alert('Enter receiver No');
    }
    // let obj1 = {
    //   sign: 'data:image/jpeg;base64,' + this.signatureImg,
    //   UploadImage: 'data:image/jpeg;base64,' + this.uploadImage

    // };
    // console.log(obj1,'hiiiiii');
    // this.userInfo = JSON.stringify(localStorage.getItem('userInfo'));
    // this.httpService.post(`https://3plindia.com/3PL/Api/ThreePL/SaveImage?base64=${this.uploadImage}&Vendor=${this.userInfo.Vendor_Codes}`,obj1).then(resp =>{
    //   console.log(resp,'....image');
    // });
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
