import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { EditEmployeeComponent } from 'src/app/components/edit-employee/edit-employee.component';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.page.html',
  styleUrls: ['./edit-employee.page.scss'],
})
export class EditEmployeePage implements OnInit {

  userInfo: any;
  employeeData: any;
  item: any;

  constructor(public popoverController: PopoverController,
              public httpService: HttpService) { }

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

  async presentPopover(item) {
    const popover = await this.popoverController.create({
      component: EditEmployeeComponent,
      cssClass: 'pop-over2',
      showBackdrop:false,
      componentProps: {
        pageData: item
      }
    });
    await popover.present();
  }

}
