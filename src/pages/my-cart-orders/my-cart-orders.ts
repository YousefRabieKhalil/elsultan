import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HelperToolsProvider } from '../../providers/helper-tools/helper-tools';
import { ProductConntrollerProvider } from '../../providers/product-conntroller/product-conntroller';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the MyCartOrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-cart-orders',
  templateUrl: 'my-cart-orders.html',
})
export class MyCartOrdersPage {
  DetailsOfOrder;
  Products;
  constructor(public navCtrl: NavController, public navParams: NavParams, private helper_tools: HelperToolsProvider,
    private product_controller: ProductConntrollerProvider, private api: ApiProvider,
    private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyCartOrdersPage');
    this.DetailsOfOrder = this.navParams.get('OrderItem');
    this.helper_tools.ShowLoadingSpinnerOnly().then(_ => {
      this.helper_tools.DismissLoading();
      this.ShowProductsOfOrders();
    }).catch(err => {
      console.log(err);
      this.helper_tools.DismissLoading();
      this.helper_tools.ShowBadRequestErrorAlert();
    })
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

  ShowProductsOfOrders(){
    this.product_controller.LoadAllProductsInOrders(this.DetailsOfOrder).subscribe(Data => {
      if(Data['Status'] == 'success'){
        this.Products = Data['message'][0];
      } else {
        console.log(Data);
      }
    }, err => {
      console.log(err);
      this.helper_tools.ShowBadRequestErrorAlert();
    })
  }

  DeleteItem(Temp){
    let DataSent = {
      product_id: Temp['id']
    }
    this.product_controller.DeleteProductItemOrder(DataSent).subscribe(Data => {
      if(Data['Status'] == 'success'){
        this.helper_tools.showAlertWithOkButton('نجاح', 'تم مسح العنصر بنجاح');
        this.ionViewDidLoad();
      } else {
        console.log(Data);
        this.helper_tools.ShowBadRequestErrorAlert();
      }
    }, err => {
      console.log(err);
      this.helper_tools.ShowBadRequestErrorAlert();
    })
  }

}
