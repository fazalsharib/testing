/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-const */
/* eslint-disable max-len */
import { HttpService } from 'src/app/services/http.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {

  modes: any;
  statusMode: any;
  listData: any;
  userInfo: any;
  date: any;
  fromDate: any;
  toDate: any;

  constructor(public httpService: HttpService,
              public datePipe: DatePipe,) { }

  ngOnInit() {
    this.httpService.get('https://3plindia.com/3PL/Api/ThreePL/Getstatus').then(resp=>{
      this.modes = resp.data;
    });
  }

  findStatusMode(){
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.httpService.get('https://3plindia.com/3PL/Api/ThreePL/GetReportByStatus?vendor_code='+this.userInfo.Vendor_Code+'&status='+this.statusMode).then(resp=>{
      console.log(resp,'find by status');
      this.listData = resp.data;
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
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.httpService.get(`https://3plindia.com/3PL/Api/ThreePL/GetReportbyDate?Vendor_code=${this.userInfo.Vendor_Code}&Fromdate=${this.fromDate}&ToDate=`+this.toDate).then(resp=>{
      console.log(resp,'find by date');
      this.listData = resp.data;
    });
  }


  // searchRecord(){
  //   if(this.date){

  //   }
  //   else(this.pickupSheetNo){
  //     console.log(this.pickupSheetNo);
  //     this.httpService.post(`https://3plindia.com/3PL/Api/ThreePL/DelDataByPickupSheet?vendor_code=${this.userInfo.Vendor_Code}&PickupSheet=`+this.pickupSheetNo,'').then(resp=>{
  //       console.log(resp);
  //       this.presentAlert(resp.message);
  //       this.navctrl.navigateRoot('pickup-order');
  //       // this.navctrl.navigateBack('pickup-order');
  //       this.ngOnInit();
  //     });
  //   }
  // }
}
