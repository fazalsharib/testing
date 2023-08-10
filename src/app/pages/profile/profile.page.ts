import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userInfo: any;
  profileData: any;

  constructor(public httpService: HttpService) { }

  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    console.log(this.userInfo);
    this.httpService.get('https://3plindia.com/3PL/api/ThreePL/GetVendorProfile?Vendor_Code='+this.userInfo.Vendor_Code).then(resp=>{
      this.profileData = resp.data[0];
      console.log(this.profileData,'profile data');

    });

  }

}
