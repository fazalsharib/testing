import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(public navCtrl: NavController) {

    // setTimeout(() => {
    //   this.navCtrl.navigateForward('register');
    // }, 4000);
   }

  ngOnInit() {
  }

}
