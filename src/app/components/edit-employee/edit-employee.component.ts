/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { NavController, PopoverController, NavParams } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss'],
})
export class EditEmployeeComponent implements OnInit {

  locations: any;
  validationMessage: any = [];
  registerForm: FormGroup;
  validationsform: FormGroup;
  locationName: any;
  userInfo: any;
  vendorCode: any;
  location: any;
  listData: any;
  itemData: any;

  showPassword = false;

  constructor(public httpService: HttpService,
              public formBuilder: FormBuilder,
              public navCtrl: NavController,
              public navParams: NavParams,
              public activeRoute: ActivatedRoute,
              public popoverController: PopoverController) {
                this.listData = this.navParams.get('pageData');
                console.log(this.listData);
              }

  ngOnInit() {
  this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
  this.validationMessage = {
    employeeName: [
      {type: 'required', message: 'Please enter your company name.'}
    ],
    mobileNo: [
      {type: 'required', message: 'Please enter your Contact number.'},
      {type: 'maxlength', message: 'Please enter 10 digit number.'},
      {type: 'pattern', message: 'Please enter valid mobile number.'},
    ],
    locationName: [
      {type: 'required', message: 'Please enter your city name.'}
    ],
    userName: [
      {type: 'required', message: 'Please enter your User-Name.'}
    ],
    password: [
      {type: 'required', message: 'Please enter your password.'}
    ]
  };
  this.registerForm  = this.formBuilder.group({
    employeeName: new FormControl(this.listData.EmployeeName, Validators.compose([
      Validators.required,
      Validators.maxLength(20)
    ])),
    mobileNo: new FormControl(this.listData.EmployeePhone, Validators.compose([
      Validators.required,
      Validators.maxLength(10)
    ])),
    locationName: new FormControl(this.locationName, Validators.compose([
      Validators.required,
    ])),
    userName: new FormControl(this.listData.Username, Validators.compose([
      Validators.required,
    ])),
    password: new FormControl(this.listData.Password, Validators.compose([
      Validators.required,
    ]))
  });
  this.getCityName();
}

  toggleShow() {
    this.showPassword = !this.showPassword;
  }


  getCityName(){
    this.httpService.get('https://3plindia.com/3PL/Api/ThreePL/GetDestination').then(resp=>{
        console.log(resp.data);
        this.locations = resp.data;
    });
  }

  locationValue(event){
    this.location = event.detail.value;
  }
  onCancel(){
    this.popoverController.dismiss();
  }

  formSubmit(formData){
    if(this.registerForm.valid){
      let obj = {
        Vendor_code: this.userInfo.Vendor_Code,
        EmployeeName : formData.employeeName,
        EmployeePhone : formData.mobileNo,
        EmployeeDestination : formData.locationName,
        Username : formData.userName,
        Password : formData.password,
      };
      console.log(obj,'kidher hai');
      this.httpService.post('https://3plindia.com/3pl/api/Threepl/UpdateEmployee?Employee_code=' + this.listData.Employee_code, obj).then(resp=>{
      console.log(resp);
        if(resp.status === 0){
          alert(resp.message);
          this.popoverController.dismiss();
          this.navCtrl.navigateRoot('employee');
        }else{
          alert(resp.message);
        }
      });
      } else{
        // console.log('invalid');
        Object.keys(this.registerForm.controls).forEach((filed) => {
          const control =  this.registerForm.get(filed);
          control.markAsTouched({onlySelf: true});
        });
      }
  }
}
