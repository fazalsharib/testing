/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable prefer-const */
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController, NavController, PopoverController } from '@ionic/angular';
import { EditSelectModalComponent } from 'src/app/components/edit-select-modal/edit-select-modal.component';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

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
      header: 'Pick-Up Sheet No = ' + i.PickupSheetNo,
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
                    console.log(a.PickupSheetNo,'..a');
                    if( a.PickupSheetNo === i.PickupSheetNo){
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
      component: EditSelectModalComponent,
      cssClass: 'pop-over2',
      showBackdrop:false,
      componentProps: {pageData: this.pageData}
    });
    await popover.present();
  }


  addAwbNo(){

    let dataResp: any;
    dataResp = this.listData.filter(a=>a.OrderNo.toString() === this.awbNumber.toString());
    if(this.pageData.findIndex(a=>a.OrderNo.toString() === this.awbNumber.toString()) === -1 && dataResp){
      this.pageData.push(dataResp[0]);
    }
  }
}
