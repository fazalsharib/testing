/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
import { ActionSheetController, NavController } from '@ionic/angular';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-pickup-order',
  templateUrl: './pickup-order.page.html',
  styleUrls: ['./pickup-order.page.scss'],
})
export class PickupOrderPage implements OnInit {

  listData: any;

  constructor(public navCtrl: NavController,
              public actionCtrl: ActionSheetController,
              public httpService: HttpService, ) { }

  ngOnInit() {}

  gotoPendingPage(){
    this.navCtrl.navigateForward('pending-order');
  }
  gotoGeneratePage(){
    this.navCtrl.navigateForward('generate-pickup');
  }
  gotoViewPage(){
    this.navCtrl.navigateForward('view');
  }
  gotoDeletePage(){
    this.navCtrl.navigateForward('delete');
  }
  gotoEditPage(){
    this.navCtrl.navigateForward('edit-select');
  }
  openProfile(){
    this.navCtrl.navigateForward('profile');
  }
  openDashboard(){
    this.navCtrl.navigateForward('dasboard');
  }
}
