/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, Query } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-generate-pickup',
  templateUrl: './generate-pickup.page.html',
  styleUrls: ['./generate-pickup.page.scss'],
})

export class GeneratePickupPage implements OnInit {

  listData = [];
  pendingDone: any;
  pickup: any;
  filterTerm: string;
  selectableOrder: any = [];
  select: any = [];
  userInfo: any;

  constructor(public httpService: HttpService,
              public navctrl: NavController) { }

  ngOnInit() {
    this.loadData();
    this.gotoNextPage();
  }

  ionViewDidEnter(){
    this.currentSelected = [];
    this.loadData();
  }

  loadData(){
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    console.log(this.userInfo.Vendor_Code);

    this.httpService.post('https://3plindia.com/3pl/api/Threepl/PickupPendingData?vendor_code='+this.userInfo.Vendor_Code,'').then(resp=>{
    // this.httpService.post('https://3plindia.com/3pl/api/Threepl/PickupPendingData?vendor_code=1364JUS','').then(resp=>{
      console.log(resp);
      this.pickup =resp.PickupDone;
      this.pendingDone = resp.Pending;
      this.listData = resp.ListDATA;
    });
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
      this.navctrl.navigateForward('g-select-page', {
        queryParams:{
          dataParams: this.select,
          listData: this.listData
        }
      });
    }
  }
}
