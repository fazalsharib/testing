import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(public httpClient: HttpClient) { }

  post(url: string,request: any){
    return new Promise<any>(resolve => {
        this.httpClient.post(url, request, {}).subscribe(data => {
        resolve(data);
      }, err => {
        resolve(err);
      });
    });
  }

  get(url: string) {
    return new Promise<any>(resolve => {
      this.httpClient.get(url, {params: {},headers: {}}).subscribe(data => {
          resolve(data);
        }, err => {
          resolve(err);
        });
    });
  }

  pinDetails(pincode: string) {
    const apiUrl =  'https://api.postalpincode.in/pincode/'+ pincode;
    return new Promise<any>(resolve => {
      this.httpClient.get(apiUrl, {params: {},headers: {}}).subscribe(data => {
          resolve(data);
        }, err => {
          resolve(err);
        });
    });
  }

  delete(url: string,request: any){
    return new Promise<any>(resolve => {
        this.httpClient.post(url, request, {}).subscribe(data => {
        resolve(data);
      }, err => {
        resolve(err);
      });
    });
  }
}
