import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.page.html',
  styleUrls: ['./employee.page.scss'],
})
export class EmployeePage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  openProfile(){
    this.navCtrl.navigateForward('profile');
  }
  openDashboard(){
    this.navCtrl.navigateForward('dasboard');
  }
  openAddEmployee(){
    this.navCtrl.navigateForward('add-employee');
  }
  openEditEmployee(){
    this.navCtrl.navigateForward('edit-employee');
  }
  openDeleteEmployee(){
    this.navCtrl.navigateForward('delete-employee');
  }

}
