/* eslint-disable no-bitwise */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionSheetController, ModalController, NavController, PopoverController } from '@ionic/angular';
import { HttpService } from 'src/app/services/http.service';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { PolicytermsComponent } from 'src/app/components/policyterms/policyterms.component';

@Component({
  selector: 'app-new-registration',
  templateUrl: './new-registration.page.html',
  styleUrls: ['./new-registration.page.scss'],
})
export class NewRegistrationPage implements OnInit {
  validationMessage: any = [];
  registerForm: FormGroup;
  validationsform: FormGroup;
  pincode: any;
  cityName: any;
  stateName: any;
  countryName: any;
  companyName: any =[];
  isChecked = false;
  companyLogo: any;
  panPic: any;
  aadharPic: any;
  imageData: any;
  base64Data: any;
  base64Image: any;
  isenabled = true;
  states: any;
  cities: any;
  showPassword = false;

  countries = [
    {countryCode: 'IND', countryName: 'INDIA'},
    {countryCode: 'BAN', countryName: 'BANGLADESH'},
    {countryCode: 'AFG', countryName: 'AFGANISTAN'},
    {countryCode: 'PAK', countryName: 'PAKISTAN'},
  ];

  constructor(public formBuilder: FormBuilder,
              public popoverController: PopoverController,
              public navCtrl: NavController,
              public actionCtrl: ActionSheetController,
              public httpService: HttpService,
              public modalController: ModalController,
              public camera: Camera,
              private router: Router) { }

  ngOnInit() {
    this.validationMessage = {
      companyName: [
        {type: 'required', message: 'Please enter your company name.'}
      ],
      gstNumber: [
        {type: 'required', message: 'Please enter GST number.'}
      ],
      gstPercentage: [
        {type: 'required', message: 'Please enter GST Value.'}
      ],
      contactNumber: [
        {type: 'required', message: 'Please enter your Contact number.'},
        {type: 'maxlength', message: 'Please enter 10 digit number.'},
        {type: 'pattern', message: 'Please enter valid mobile number.'},
      ],
      emailId: [
        {type: 'required', message: 'Please enter your email-Id.'},
        {type: 'maxlength', message: 'Please enter maximum 30 characters.'},
        {type: 'pattern', message: 'Please enter valid email-Id.'},
      ],
      address1: [
        {type: 'required', message: 'Please enter your address.'},
        {type: 'maxlength', message: 'Please enter maximum 50 characters.'},
      ],
      address2: [
        {type: 'required', message: 'Please enter your address2.'}
      ],
      landmark: [
        {type: 'required', message: 'Please enter your landmark.'},
        {type: 'maxlength', message: 'Please enter maximum 50 characters.'},
      ],
      pincode: [
        {type: 'required', message: 'Please enter area pincode.'},
        {type: 'maxlength', message: 'Please enter maximum 6 characters.'},
      ],
      cityName: [
        {type: 'required', message: 'Please enter your city name.'}
      ],
      stateName: [
        {type: 'required', message: 'Please enter your state name.'}
      ],
      countryName: [
        {type: 'required', message: 'Please enter your country name.'}
      ],
      userName: [
        {type: 'required', message: 'Please enter your User-Name.'}
      ],
      password: [
        {type: 'required', message: 'Please enter your password.'}
      ],
      invoiceNo: [
        {type: 'required', message: 'Please enter Invoice No.'}
      ],
    };
    this.registerForm  = this.formBuilder.group({
      companyName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(20)
      ])),
      gstNumber: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(25)
      ])),
      gstPercentage: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      contactNumber: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(10)
      ])),
      emilId: new FormControl('', Validators.compose([
        Validators.pattern('^[a-z]+[a-z0-9._]+@[a-z]+\\.[a-z.]{2,5}$'),
        Validators.required,
        Validators.maxLength(30),
      ])),
      address1: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(50),
      ])),
      address2: new FormControl('', Validators.compose([])),
      landmark: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      pincode: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(6),
      ])),
      cityName: new FormControl(this.cityName, Validators.compose([
        Validators.required,
      ])),
      stateName: new FormControl(this.stateName, Validators.compose([
        Validators.required,
      ])),
      countryName: new FormControl(this.countryName, Validators.compose([
        Validators.required,
      ])),
      userName: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      invoiceNo: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });
    this.getCityName();
    this.getStateName();
}

getCityName(){
  this.httpService.get('https://3plindia.com/3PL/Api/ThreePL/GetDestination').then(resp=>{
      console.log(resp.data);
      this.cities = resp.data;
  });
}

getStateName(){
  this.httpService.get('https://3plindia.com/3PL/Api/ThreePL/GetState').then(resp=>{
      console.log(resp.data);
      this.states = resp.data;
  });
}


getpincode(event){
  this.pincode = event.target.value;
  if(this.pincode){
    this.httpService.get('https://3plindia.com/3PL/Api/ThreePL/GetPin?Pincode=' + this.pincode).then(resp=>{
      this.registerForm.controls.cityName.setValue(resp.data[0].Destination_code );
      this.registerForm.controls.stateName.setValue(resp.data[0].State_code );
      this.registerForm.controls.countryName.setValue(resp.data[0].Country_Name);
    });
  }
}

async getImage(doctype: string){
  const actionSheet = this.actionCtrl.create({
          cssClass: 'action-sheets-basic-page',
          buttons: [
              {
                  text: 'Take photo',
                  role: 'destructive',
                  icon: 'camera',
                  handler: () => {
                      this.takephoto(doctype);
                  }
              },
              {
                  text: 'Choose photo from Gallery',
                  icon: 'image',
                  handler: () => {
                      this.openGallery(doctype);
                  }
              },
          ]
      });
      (await actionSheet).present();
  }
  takephoto(doctype) {
      const options: CameraOptions =
      {
          quality: 30,
          sourceType: this.camera.PictureSourceType.CAMERA,
          destinationType: this.camera.DestinationType.DATA_URL,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE,
          correctOrientation: true
      };

      this.camera.getPicture(options).then((imageData) => {
        if(doctype === 'Profile'){
          this.companyLogo = 'data:image/jpeg;base64,' + imageData;
        } else if (doctype === 'pan'){
          this.panPic = 'data:image/jpeg;base64,' + imageData;
        } else if(doctype === 'adhaar'){
          this.aadharPic = 'data:image/jpeg;base64,' + imageData;
        }
      }, (err) => {
        alert('unable to capture');
      });
  }

  openGallery(doctype) {
    const options: CameraOptions =
    {
    quality: 30,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true
    };
    this.camera.getPicture(options).then((imageData) => {
      if(doctype === 'Profile'){
        this.companyLogo = 'data:image/jpeg;base64,' + imageData;
      } else if (doctype === 'pan'){
        this.panPic = 'data:image/jpeg;base64,' + imageData;
      } else if(doctype === 'adhaar'){
        this.aadharPic = 'data:image/jpeg;base64,' + imageData;
      }
    }, (err) => {
      alert('unable to capture');
    });
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
  }


formSubmit(formData){
  this.isChecked = true;
    if(this.registerForm.valid){
      let obj = {
        Vendor_Name: formData.companyName,
        GST : formData.gstNumber,
        GSTPer : formData.gstPercentage,
        Vendor_MobNo1 : formData.contactNumber,
        Vendor_eMail : formData.emilId,
        Vendor_Add1 : formData.address1,
        Vendor_Add2 : formData.address2,
        Vendor_Add3 : formData.landmark,
        Vendor_Pin : formData.pincode,
        Location_Code : formData.cityName,
        State_Code :formData.stateName,
        Country_Code : formData.countryName,
        Username : formData.userName,
        Password : formData.password,
        logo : this.companyLogo,
        StartInvoiceNo : formData.invoiceNo,
      };
      // console.log(obj);
      this.httpService.post('https://3plindia.com/3pl/api/Threepl/VendorRegister', obj).then(resp=>{
      console.log(resp);
        if(resp.status === 0){
          alert(resp.message);
          this.navCtrl.navigateRoot('/login');
        }else{
          alert('Something wrong');
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

 agree(){
  this.isenabled= this.isenabled?false:true;
}

async presentPopover() {
  const popover = await this.popoverController.create({
    component: PolicytermsComponent,
    cssClass: 'pop-over2',
    showBackdrop:false,
    // componentProps: {pageData: this.pageData}
  });
  await popover.present();
}

}
