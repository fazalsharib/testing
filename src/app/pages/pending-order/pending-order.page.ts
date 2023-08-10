/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-pending-order',
  templateUrl: './pending-order.page.html',
  styleUrls: ['./pending-order.page.scss'],
})
export class PendingOrderPage implements OnInit {
  listData = [];
  pendingDone: any;
  pickup: any;
  filterTerm: string;
  userInfo: any;
  allData: any;

  constructor(public httpService: HttpService) {
    this.loadData();
   }

  ngOnInit() {
    this.loadData();
    this.httpService.get('https://3plindia.com/3PL/api/ThreePL/GetVPickupData?Vendor_Code='+this.userInfo.Vendor_Code).then(resp=>{
      console.log(resp,'pending data');
      this.allData = resp.data[0];
      console.log(this.allData,'datalist......');
    });
  }
  loadData(){
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    console.log(this.userInfo,'sharib');
    this.httpService.post(`https://3plindia.com/3PL/api/ThreePL/PickupPendingDataByPickupBoyV?vendor_code=${this.userInfo.Vendor_Code}&username=${this.userInfo.Username}`,'').then(resp=>{
      console.log(resp);
      this.pickup =resp.PickupDone;
      this.pendingDone = resp.Pending;
      this.listData = resp.ListDATA;
    });
  }

  // currentSelected = new Array(this.listData.length);
  // handleClick(index: number, id: string) {
  //  this.currentSelected[index] = !!!this.currentSelected[index];
  //   console.log(this.currentSelected[index]);
  //   console.log('tags', this.currentSelected);
  // }

}
