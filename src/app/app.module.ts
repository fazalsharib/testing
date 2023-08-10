/* eslint-disable max-len */
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from './services/http.service';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { GSelectModalComponent } from './components/g-select-modal/g-select-modal.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PortService } from './services/port.service';
import { SearchComponent } from './components/search/search.component';
import { ReasonComponent } from './components/reason/reason.component';
import { EditSelectModalComponent } from './components/edit-select-modal/edit-select-modal.component';
import { ServiceLocatorComponent } from './components/service-locator/service-locator.component';
import { EditRateComponent } from './components/edit-rate/edit-rate.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
// import { Printer } from '@awesome-cordova-plugins/printer/ngx';
// import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
// import { Printer, PrintOptions } from '@awesome-cordova-plugins/printer/ngx';



@NgModule({
  declarations: [AppComponent,
                GSelectModalComponent,
                EditSelectModalComponent,
                EditRateComponent,
                SearchComponent,
                ReasonComponent,
                ServiceLocatorComponent,
                EditEmployeeComponent],
  imports: [BrowserModule,
            IonicModule.forRoot(),
            AppRoutingModule,
            HttpClientModule,
            CommonModule,
            ReactiveFormsModule,
            FormsModule,
            Ng2SearchPipeModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
              HttpService,
              Camera,
              PortService,
              NavParams,
              DatePipe,
              // Printer,
              // PDFGenerator,
            ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule {}
