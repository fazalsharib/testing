/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userName: any;
  password: any;
  validationMessage: any = [];
  loginForm: FormGroup;
  validationsform: FormGroup;
  errorMessage: boolean = false;
  showPassword = false;

  constructor(public navCtrl: NavController,
              public formBuilder: FormBuilder,
              public httpService: HttpService,
              public alertController: AlertController,
              public toastController: ToastController) { }

  ngOnInit() {
    this.validationMessage = {
      userName: [
        {type: 'required', message: 'Please enter your User-Name.'}
      ],
      password: [
        {type: 'required', message: 'Please enter your password.'}
      ],
    };
    this.loginForm  = this.formBuilder.group({
      userName: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });
}

  // toggleShow() {
  //   this.showPassword = !this.showPassword;
  // }

  registerHere(){
    this.navCtrl.navigateForward('new-registration');
  }

  formSubmit(formData){
    if(this.loginForm.valueChanges){
}
    this.httpService.get('https://3plindia.com/3PL/api/ThreePL/GetLogin?username='+this.loginForm.controls.userName.value+'&password='+this.loginForm.controls.password.value).then(resp=>{
      console.log(resp);
      if(resp.status === 1){
        if(resp.count > 0){
          localStorage.setItem('userInfo', JSON.stringify(resp.data));
          this.navCtrl.navigateForward('dasboard');
          this.presentToast('Logged In Successfully');
        }else{
          // console.log('invalid');
          Object.keys(this.loginForm.controls).forEach((filed) => {
            const control =  this.loginForm.get(filed);
            control.markAsTouched({onlySelf: true});
          });
        }
      }
      else{
         this.presentToast('Credentials mis-match');
      }
    });
  }


  async presentToast(responceMessage) {
    const toast = await this.toastController.create({
      message: responceMessage,
      duration: 2000,
      icon: 'information-circle',
      position: 'top',
    });
    toast.present();
  }
}
