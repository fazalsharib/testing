/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpService } from './../../services/http.service';
import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-others-changespage',
  templateUrl: './others-changespage.page.html',
  styleUrls: ['./others-changespage.page.scss'],
})
export class OthersChangespagePage implements OnInit {

  awbCharges: any;
  fuelCharges: any;
  insuranceCharges: any;
  minTICharges: any;
  fovCharges: any;
  minFovCharges: any;
  cofCharges: any;
  minCofCharges: any;
  odaCharges: any;
  minOdaCharges: any;
  pickupCharges: any;
  minPickupCharges: any;
  deliveryCharges: any;
  minDeliveryCharges: any;
  loadingCharges: any;
  minLoadingCharges: any;
  unloadingCharges: any;
  minUnloadingCharges: any;
  codCharges: any;
  minCodCharges: any;
  fodCharges: any;
  minFodCharges: any;
  handlingCharges: any;
  minHandlingCharges: any;
  packingCharges: any;
  minPackingCharges: any;
  wareHousingCharge: any;
  minWareHousingCharges: any;
  demurrageCharges: any;
  minDemurrageCharges: any;
  shipmentCharges: any;
  minShipmentCharges: any;
  mallDeliveryCharges: any;
  minMallDeliveryCharges: any;
  timeCharges: any;
  minTimeCharges: any;
  appointmentDelivery: any;
  minAppointmentDelivery: any;
  specialDeliveryCharges: any;
  minSpecialDeliveryCharges: any;
  orderCancel: any;
  minOrderCancel: any;
  addressCorrection: any;
  minAddressCorrection: any;
  reattemptDelivery: any;
  minReattemptDelivery: any;
  ndtCharges: any;
  minNdtCharges: any;
  unionCharges: any;
  minUnionCharges: any;
  othersCharges: any;
  minOthersCharges: any;
  userInfo: any;



  constructor(public httpService: HttpService,
              public navCtrl: NavController,
              public alertController: AlertController) { }

  ngOnInit() {
  }

  onSubmit(){
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    console.log(this.userInfo.Vendor_Code);
    let obj = {
      Vendor_Code : this.userInfo.Vendor_Code,
      AWB_Chg: this.awbCharges,
      Transit_Insurance_Chg: this.insuranceCharges,
      MinTransit_Insurance_Chg: this.minTICharges,
      FOV_Chg_min: this.minFovCharges,
      FOV_Chg: this.fovCharges,
      Fuel_Chg: this.fuelCharges,
      ODA_Chg_min: this.minOdaCharges,
      ODA_Chg: this.odaCharges,
      COF_Chg_min: this.minCofCharges,
      COF_Chg: this.cofCharges,
      Pickup_Chg_min: this.minPickupCharges,
      Pickup_Chg: this.pickupCharges,
      Delivery_Chg_min: this.minDeliveryCharges,
      Delivery_Chg: this.deliveryCharges,
      Loading_Chg_min: this.minLoadingCharges,
      Loading_Chg: this.loadingCharges,
      Unloading_Chg_min: this.minUnloadingCharges,
      Unloading_Chg: this.minUnloadingCharges,
      COD_Chg_min: this.minCodCharges,
      COD_Chg: this.codCharges,
      FOD_Chg_min: this.minFodCharges,
      FOD_Chg: this.fodCharges,
      Handling_Chg_min: this.minHandlingCharges,
      Handling_Chg: this.handlingCharges,
      Packing_Chg_min: this.minPackingCharges,
      Packing_Chg: this.packingCharges,
      Warehousing_Chg_min: this.minWareHousingCharges,
      Warehousing_Chg: this.wareHousingCharge,
      Demurrage_Chg_min: this.minDemurrageCharges,
      Demurrage_Chg: this.demurrageCharges,
      Shipment_Holding_Chg_min: this.minShipmentCharges,
      Shipment_Holding_Chg: this.shipmentCharges,
      Mall_Delivery_Chg_min: this.minMallDeliveryCharges,
      Mall_Delivery_Chg: this.mallDeliveryCharges,
      Time_Specific_Delivery_Chg_min: this.minTimeCharges,
      Time_Specific_Delivery_Chg: this.timeCharges,
      Appoiment_Delivery_Chg_min: this.minAppointmentDelivery,
      Appoiment_Delivery_Chg: this.appointmentDelivery,
      Special_Delivery_Chg_min: this.minSpecialDeliveryCharges,
      Special_Delivery_Chg: this.specialDeliveryCharges,
      Order_Cancel_Chg_min: this.minOrderCancel,
      Order_Cancel_Chg: this.orderCancel,
      Address_Correction_Chg_min: this.minAddressCorrection,
      Address_Correction_Chg: this.addressCorrection,
      ReAttempt_Delivery_Chg_min: this.minReattemptDelivery,
      ReAttempt_Delivery_Chg: this.reattemptDelivery,
      NDT_Chg_min: this.minNdtCharges,
      NDT_Chg: this.ndtCharges,
      Union_Chg_min: this.minUnionCharges,
      Union_Chg: this.unionCharges,
      Other_Chg_min: this.minOthersCharges,
      Other_Chg: this.othersCharges,
    };
    this.httpService.post('https://3plindia.com/3pl/api/Threepl/PostOtherChg',obj).then(resp=>{
      console.log(resp,'data show');
      this.presentAlert(resp.message);
      this.navCtrl.navigateBack('dasboard');
      });
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
