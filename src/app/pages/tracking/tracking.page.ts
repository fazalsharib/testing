import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.page.html',
  styleUrls: ['./tracking.page.scss'],
})
export class TrackingPage implements OnInit {

  pageData: any;
  podData: any;

  constructor(public activeRoute: ActivatedRoute) {
              this.activeRoute.queryParams.subscribe(resp=>{
                this.pageData = resp.dataParams;
                console.log(this.pageData);
                this.podData =  this.pageData.POD;
                console.log(this.podData);
              });
             }

  ngOnInit() {
  }

}
