import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedClass } from '../SharedClass';

@Injectable()
export class ProductConntrollerProvider {
  CartAdded = [] as any;
  constructor(public http: HttpClient) {
    console.log('Hello ProductConntrollerProvider Provider');
  }

  LoadAllDetailsOfProduct(ID){
    let URL = `${SharedClass.BASE_URL}/productdetials?proudact_id=${ID}`;
    return this.http.get(URL);
  }

  SubmitOrder(DataSent){
    let URL = `${SharedClass.BASE_URL}/order`;
    return this.http.post(URL, DataSent);
  }

  LoadAllMyOrders(DataSent){
    let URL = `${SharedClass.BASE_URL}/allorderforuser?client_id=${DataSent.ID}&offset=${DataSent.offset}`;
    return this.http.get(URL);
  }

  DeleteItemOrder(ID){
    let URL = `${SharedClass.BASE_URL}/deleteorder`;
    return this.http.post(URL, ID);
  }

  LoadAllProductsInOrders(OrderID){
    let URL = `${SharedClass.BASE_URL}/allproductinorder?order_id=${OrderID}`;
    return this.http.get(URL);
  }

  DeleteProductItemOrder(ID){
    let URL = `${SharedClass.BASE_URL}/deleteproductfromorder`;
    return this.http.post(URL, ID);
  }

}
