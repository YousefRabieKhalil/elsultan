import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { HelperToolsProvider } from '../../providers/helper-tools/helper-tools';
import { ProductConntrollerProvider } from '../../providers/product-conntroller/product-conntroller';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the MyOrdersDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-orders-details',
  templateUrl: 'my-orders-details.html',
})
export class MyOrdersDetailsPage {
  DetailsOfOrdersWeight;
  DetailsOfOrdersCut;
  Order = {} as any;
  IDProduct;
  ApearPriceOfShipping = true;
  AppearDataOfMafrom = false;
  SelectedTemp;
  constructor(public navCtrl: NavController, private modalCtrl: ModalController, private events: Events,
    public navParams: NavParams, private helper_tools: HelperToolsProvider, private api: ApiProvider,
    private product_controller: ProductConntrollerProvider, private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyOrdersDetailsPage');
    this.IDProduct = this.navParams.get('DetailsOfOrder');
    console.log(this.IDProduct)
    this.GetAllDetailsOfProduct();
  }

  GetAllDetailsOfProduct() {
    this.helper_tools.ShowLoadingSpinnerOnly().then(_ => {
      this.product_controller.LoadAllDetailsOfProduct(this.IDProduct['id']).subscribe(Data => {
        if(this.api.CountryID['gove'] == 'الطائف'){
          this.ApearPriceOfShipping = false;
        }
        this.helper_tools.DismissLoading();
        if (Data['Status'] == 'success') {
          this.DetailsOfOrdersWeight = Data['wight'];
          this.Order['quent'] = 0;
          this.Order['note'] = '';
          this.Order['product_id'] = this.IDProduct['id'];
          this.Order['name'] = this.IDProduct['name'];
          this.Order['qmafrom'] = 0;
          this.Order['wight_id'] = this.DetailsOfOrdersWeight[0]['id']
          this.Order['price'] = 0;
          this.Order['pricemafrom'] = 0;
          this.DetailsOfOrdersCut = Data['cut'];
          this.Order['cut_id'] = this.DetailsOfOrdersCut[0]['id'];
          this.AppearDataOfMafrom = false;
      } else {
          console.log(Data);
          this.helper_tools.ShowBadRequestErrorAlert();
        }
      }, err => {
        console.log(err);
        this.helper_tools.DismissLoading();
        this.helper_tools.ShowBadRequestErrorAlert();
      })
    }).catch(err => {
      console.log(err);
      this.helper_tools.DismissLoading();
      this.helper_tools.ShowBadRequestErrorAlert();
    })
  }

  CutChanged(){
    if(this.Order['cut_id'] == 9){
      this.AppearDataOfMafrom = true;
    }
  }

  WeightChanged() {
    this.SelectedTemp = this.DetailsOfOrdersWeight.filter(x => { return x.id == this.Order['wight_id'] })[0];
    console.log(this.SelectedTemp)
    this.Order['price'] = this.SelectedTemp['price'] * this.Order['quent'];
    this.Order['pricemafrom'] = this.SelectedTemp['pricemafrom'] * this.Order['qmafrom'];
  }

  GoToChoosenPage(Temp) {
    if (Temp == 'ProfilePage' && !this.api.UserData['id']) {
      var modal = this.modalCtrl.create('LogInPage');
      modal.present();
      modal.onDidDismiss(Data => {
        this.navCtrl.setRoot('TabsPage');
      })
    } else {
      this.navCtrl.push(Temp);
    }
  }

  AddToCartFunc() {
    if (this.Order['price'] == '0' && this.Order['pricemafrom'] == '0') {
      this.helper_tools.showAlertWithOkButton('خطأ', 'برجاء اضافه كميه مفروم او كميه عادي');
      return;
    }
    var res = this.product_controller.CartAdded.find(fruit => fruit.product_id == this.Order['product_id']);
    console.log(res);
    console.log(this.Order);
    if (res && res['product_id'] == this.Order['product_id'] /*&& (res['quent'] == this.Order['quent']) && (res['qmafrom'] == this.Order['qmafrom'])*/) {
      //this.helper_tools.showAlertWithOkButton('خطأ', 'هذا العنصر موجود من قبل بنفس الكمية');
      this.product_controller.CartAdded.splice(this.product_controller.CartAdded.indexOf(res), 1);
      this.Order['totalprice'] = (this.Order['price']) + (this.Order['pricemafrom']);
      this.product_controller.CartAdded.push(this.Order);
      this.storage.set('CartSaved', this.product_controller.CartAdded);
      this.helper_tools.showAlertWithOkButton('نجاح', 'تم تعديل العنصر بنجاح');
    } /*else if(res['id'] == this.Order['id']){
        this.product_controller.CartAdded.splice(this.product_controller.CartAdded.indexOf(res), 1);
        this.Order['totalprice'] = (this.Order['quent'] * this.Order['price']) + (this.Order['qmafrom'] * this.Order['pricemafrom']);
        this.product_controller.CartAdded.push(this.Order);
        this.storage.set('CartSaved', this.product_controller.CartAdded);
        this.helper_tools.ShowAlertWithTranslation('نجاح', 'تم تعديل العنصر بنجاح');
      }*/ else {
      this.Order['totalprice'] = (this.Order['price']) + (this.Order['pricemafrom']) + 100;
      this.product_controller.CartAdded.push(this.Order);
      this.api.NumberOrders = this.product_controller.CartAdded.length;
      this.events.publish('NumberOfOrders');
      this.storage.set('CartSaved', this.product_controller.CartAdded);
      this.helper_tools.showAlertWithOkButton('نجاح', 'تم اضافة العنصر بنجاح');
    }
  }

  OrderNow() {
    if (this.Order['price'] == '0' && this.Order['pricemafrom'] == '0') {
      this.helper_tools.showAlertWithOkButton('خطأ', 'برجاء اضافه كميه مفروم او كميه عادي');
      return;
    }
    else if (this.api.UserData['id']) {
      this.AddToCartFunc();
      this.navCtrl.push('MyCartDetailsPage');
    } else {
      var modal = this.modalCtrl.create('LogInPage');
      modal.present();
      modal.onDidDismiss(Data => {

      })
    }
  }

  // OpenWindowPage(){
  //   window.open('http://www.facebook.com');
  // }

  PlusFunc() {
    this.Order['quent'] += 1;
    this.WeightChanged();
  }

  MinusFunc() {
    if (this.Order['quent'] >= 1) {
      this.Order['quent'] -= 1;
      this.WeightChanged();
    }
  }

  PlusFunc1() {
    this.Order['qmafrom'] += 1;
    this.WeightChanged();

  }

  MinusFunc1() {
    if (this.Order['qmafrom'] >= 1) {
      this.Order['qmafrom'] -= 1;
      this.WeightChanged();
    }
  }

}
