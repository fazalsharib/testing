/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-locator',
  templateUrl: './service-locator.component.html',
  styleUrls: ['./service-locator.component.scss'],
})
export class ServiceLocatorComponent implements OnInit {

  location: boolean=false;
  pincode: boolean = true;

  constructor() { }

  ngOnInit() {}

  searchByName(value){

    console.log(value);

    this.pincode = true;
    this.location = false;

  }
}
