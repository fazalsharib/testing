/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable prefer-const */
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, iosTransitionAnimation, ModalController, NavController, PopoverController } from '@ionic/angular';
import { GSelectModalComponent } from 'src/app/components/g-select-modal/g-select-modal.component';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-g-select-page',
  templateUrl: './g-select-page.page.html',
  styleUrls: ['./g-select-page.page.scss'],
})
export class GSelectPagePage implements OnInit {
  @ViewChild('popover') popover;
  isOpen = false;

  message: string;
  filterTerm: string;
  listData: any = [];
  pageData: any = [];
  awbNumber: string;



  constructor(public alertController: AlertController,
              public navCtrl: NavController,
              public activeRoute: ActivatedRoute,
              public httpService: HttpService,
              public popoverController: PopoverController,
              public modalCtrl: ModalController) {
                this.activeRoute.queryParams.subscribe(resp=>{
                  this.pageData = resp.dataParams;
                  console.log(this.pageData);
                  this.listData = resp.listData;
                });
              }

  ngOnInit() {}


  async removeItem(i) {
    const alert = await this.alertController.create({
      header: 'AWB NUMBER = ' + i.AwbNo,
      subHeader: 'Are you sure want to remove?',
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
                text: 'Ok',
                role: 'confirm',
                cssClass: 'alertConfirm',
                handler: () => {
                  this.pageData.filter(a => {
                    console.log(a.AwbNo,'..a');
                    if( a.AwbNo === i.AwbNo){
                      let index = this.pageData.indexOf(i);
                      console.log(index,'....index val');
                      this.pageData.splice(index,1);
                      console.log('Confirm Ok');
                          console.log(i,'....true');
                        }
                        else{
                          console.log('false');
                        }
                  });
                }
              }
            ]
    });

    await alert.present();
  }


  async presentPopover() {
    const popover = await this.popoverController.create({
      component: GSelectModalComponent,
      cssClass: 'pop-over2',
      showBackdrop:false,
      componentProps: {pageData: this.pageData}
    });
    await popover.present();
  }


  addAwbNo(){
    let dataResp: any;
    dataResp = this.listData.filter(a=>a.AwbNo.toString() === this.awbNumber.toString());
    if(this.pageData.findIndex(a=>a.AwbNo.toString() === this.awbNumber.toString()) === -1 && dataResp){
      this.pageData.push(dataResp[0]);
    }
  }
}
