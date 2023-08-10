/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {
  listData = [];
  pendingDone: any;
  pickup: any;
  filterTerm: string;
  userInfo: any;

  constructor(public httpService: HttpService) { }

  ngOnInit() {
    this.loadData();
  }
  loadData(){
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    console.log(this.userInfo,'write');

    this.httpService.get('https://3plindia.com/3PL/api/ThreePL/GetViewData?vendor_code='+this.userInfo.Vendor_Code).then(resp=>{
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
