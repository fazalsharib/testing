/* eslint-disable max-len */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { AlertController, PopoverController, NavController } from '@ionic/angular';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.page.html',
  styleUrls: ['./delete-employee.page.scss'],
})
export class DeleteEmployeePage implements OnInit {

  userInfo: any;
  employeeData: any;

  constructor(public alertController: AlertController,
              public popoverController: PopoverController,
              public httpService: HttpService,
              public navCtrl: NavController) { }

  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.getEmployeeData();
  }

  getEmployeeData(){
    this.httpService.get('https://3plindia.com/3pl/api/Threepl/GetEmployee?Vendor_code='+ this.userInfo.Vendor_Code).then(resp=>{
      console.log(resp.data);
      this.employeeData = resp.data;
    });
  }


  async removeItem(item) {
    const alert = await this.alertController.create({
      header: 'Employee Name = ' + item.EmployeeName,
      subHeader: 'Are you sure want to remove?',
      buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'alertCancel',
                handler: () => {
                  console.log('Confirm Cancel');
                }
              },
              {
                text: 'Ok',
                role: 'confirm',
                cssClass: 'alertConfirm',
                handler: () => {
                  // let obj = {
                  //   Employee_code: item.Employee_code,
                  //   Vendor_code: item.Vendor_code,
                  // };
                  // console.log(obj,'khkjh;lk');
                  this.httpService.get('https://3plindia.com/3pl/api/Threepl/GetDeleteEmployee?Vendor_code=' +  item.Vendor_code + '&Employee_code=' + item.Employee_code).then(resp=>{
                    console.log(resp);
                    if(resp.status === 0){
                       this.presentAlert(resp.message);
                       this.popoverController.dismiss('', 'confirm');
                      this.navCtrl.navigateRoot('employee');
                    }else{
                       this.presentAlert(resp.message);
                    }
                  });
                }
              }
            ]
    });
    await alert.present();
  }

  async presentAlert(responceMessage) {
    const alert = await this.alertController.create({
      header: 'Message',
      message: responceMessage,
      buttons: ['OK'],
    });

    await alert.present();
  }

}
