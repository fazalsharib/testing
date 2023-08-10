/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.page.html',
  styleUrls: ['./add-employee.page.scss'],
})
export class AddEmployeePage implements OnInit {

  locations: any;
  validationMessage: any = [];
  registerForm: FormGroup;
  validationsform: FormGroup;
  locationName: any;
  userInfo: any;
  vendorCode: any;

  constructor(public httpService: HttpService,
              public formBuilder: FormBuilder,
              public navCtrl: NavController) { }

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
      employeeName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(20)
      ])),
      mobileNo: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(10)
      ])),
      locationName: new FormControl(this.locationName, Validators.compose([
        Validators.required,
      ])),
      userName: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
      ]))
    });
    this.getCityName();
  }

  getCityName(){
    this.httpService.get('https://3plindia.com/3PL/Api/ThreePL/GetDestination').then(resp=>{
        console.log(resp.data);
        this.locations = resp.data;
    });
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
      // console.log(obj);
      this.httpService.post('https://3plindia.com/3pl/api/Threepl/PostEmployee', obj).then(resp=>{
      console.log(resp);
        if(resp.status === 0){
          alert(resp.message);
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
