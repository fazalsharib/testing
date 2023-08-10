/* eslint-disable max-len */
import { Component, NgZone, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  pickupboyList: any;
  searchableData: any;
  selectedValue: any;

  constructor(public navParams: NavParams,
              public zone: NgZone,
              public popover: PopoverController)
              {
                this.searchableData = this.navParams.get('pickupBoy');
                this.pickupboyList = this.searchableData;
                this.selectedValue = this.navParams.get('seleteddata');
              }

  ngOnInit() {}

  onClick(dataValue){
    this.zone.run(()=>{
      this.selectedValue = dataValue.PickupBoyCode;
      this.popover.dismiss(dataValue);
    });
  }
  searchData(event){
   // let filterData: any;
   if(event.target.value){
    const filterData = this.searchableData.filter(f=>f.PickupBoyCode === event.target.value || f.PickupName.toLowerCase() === event.target.value);
    this.zone.run(()=>{
      console.log(filterData);
      if(filterData.length > 0){
        this.pickupboyList = filterData;
      } else {
        this.pickupboyList = this.searchableData;
      }
    });
   } else {
    this.pickupboyList = this.searchableData;
   }
  }

}
