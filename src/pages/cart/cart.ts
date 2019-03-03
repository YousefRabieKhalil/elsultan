import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { ProductConntrollerProvider } from '../../providers/product-conntroller/product-conntroller';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  Carts;
  ShowItems;
  constructor(public navCtrl: NavController, private storage: Storage, private modalCtrl: ModalController,
    public navParams: NavParams, private product_controller: ProductConntrollerProvider, private events: Events,
    private api: ApiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
    this.events.subscribe('CartChanged', () => {
      this.Carts = this.product_controller.CartAdded;
      console.log(this.Carts);
      if (this.Carts.length != 0) {
        this.ShowItems = true;
      } else {
        this.ShowItems = false;
      }
    })

  }

  GotoDetailsPage() {
    this.navCtrl.push('MyCartDetailsPage');
  }

  DeleteItem(i) {
    this.product_controller.CartAdded.splice(i, 1);
    this.storage.set('CartSaved', this.product_controller.CartAdded);
    this.api.NumberOrders = this.product_controller.CartAdded.length;
    if(this.product_controller.CartAdded.length == 0){
      this.ShowItems = false;
    }
    this.events.publish('NumberOfOrders');
    this.ionViewDidLoad();
  }

  // GoToOpenWindow(TempURL){
  //   window.open(TempURL);
  // }

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

  OrderNow() {
    if (this.api.UserData['id']) {
      this.navCtrl.push('MyCartDetailsPage');
    } else {
      var modal = this.modalCtrl.create('LogInPage');
      modal.present();
      modal.onDidDismiss(Data => {

      })
    }
  }

}
