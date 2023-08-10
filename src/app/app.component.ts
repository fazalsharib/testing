import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages = [
    { title: 'My Profile', url: 'profile', icon: 'person' },
    { title: 'Employee', url: 'employee', icon: 'people' },
    { title: 'Help & Support', url: 'help-and-support', icon: 'help-circle' },
    { title: 'FAQs', url: 'faq', icon: 'shield-checkmark' },
    { title: 'About 3PL', url: 'about-page', icon: 'information-circle' },
  ];
  constructor(public navCtrl: NavController,
              public router: Router,
              public platform: Platform) {
                platform.ready().then(() => {
                  // Okay, so the platform is ready and our plugins are available.
                  // Here you can do any higher level native things you might need.
                });
              }

  signOut(){
    localStorage.setItem('userInfo', '');
    this.navCtrl.navigateRoot('login');
  }
}
