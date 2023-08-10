import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpService } from 'src/app/services/http.service';
import { pickup } from '../pages/delete/type';

@Injectable()
export class PortService {
  public items: pickup[] = [];

  constructor(public httpService: HttpService){}

  getCountries(page?: number, size?: number): pickup[] {
    // console.log(this.items,"....items");
    let countries = [];
    this.httpService.get('https://3plindia.com/3PL/api/ThreePL/GetPickupBoyList?Customer=1364JUS').then(resp=>{
    this.items = resp.PickupBoyList;
    // console.log(resp.PickupBoyList);
    });
    this.items.forEach((country) => {
      console.log(country,'........');
      countries.push(country);
      // country.ports.forEach((port) => {
      // console.log(port)

      //   port.country = country;
      //   ports.push(port);
      // });
    });
    if (page && size) {
      countries = this.items.slice(
        (page - 1) * size,
        (page - 1) * size + size
      );
    } else {
      countries = this.items;
    }

    return countries;
  }

  getPortsAsync(
    page?: number,
    size?: number,
    timeout = 1000
  ): Observable<pickup[]> {
    return new Observable<pickup[]>((observer) => {
      observer.next(this.getCountries(page, size));
      observer.complete();
    }).pipe(delay(timeout));
  }
}
