import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedClass } from '../SharedClass';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
  NumberOrders = 0;
  CountryID;
  UserData = {} as any;
  constructor(public http: HttpClient) {
    console.log('Hello ApiProvider Provider');
  }

  GetAllCountries(){
    let URL = `${SharedClass.BASE_URL}/allgove`;
    return this.http.get(URL);
  }

  UserSignUp(DataSent){
    let URL = `${SharedClass.BASE_URL}/registration`;
    return this.http.post(URL, DataSent);
  }

  UserLogIn(DataSent){
    let URL = `${SharedClass.BASE_URL}/login`;
    return this.http.post(URL, DataSent);
  }

  GetAllAboutUsData(){
    let URL = `${SharedClass.BASE_URL}/contactus`;
    return this.http.get(URL);
  }

  GetAllProducts(){
    let URL = `${SharedClass.BASE_URL}/allproduct`;
    return this.http.get(URL);
  }

  UpdateUserProfile(DataSent){
    let URL = `${SharedClass.BASE_URL}/updateprofile`;
    return this.http.post(URL, DataSent);
  }

}
