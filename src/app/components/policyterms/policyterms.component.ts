import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-policyterms',
  templateUrl: './policyterms.component.html',
  styleUrls: ['./policyterms.component.scss'],
})
export class PolicytermsComponent implements OnInit {

  isenabled = true;

  constructor(public navCtrl: NavController,
              public popoverController: PopoverController) { }

  ngOnInit() {}

  agree(){
    this.isenabled= this.isenabled?false:true;
  }

  ok(){
    this.popoverController.dismiss();
  }


}
