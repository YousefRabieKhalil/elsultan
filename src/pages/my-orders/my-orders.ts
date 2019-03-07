import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { ProductConntrollerProvider } from '../../providers/product-conntroller/product-conntroller';
import { HelperToolsProvider } from '../../providers/helper-tools/helper-tools';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the MyOrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-orders',
  templateUrl: 'my-orders.html',
})
export class MyOrdersPage {
  offset = 0;
  Orders = [] as any;
  ShowItems = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, private productController: ProductConntrollerProvider,
    private api: ApiProvider, private modalCtrl: ModalController,private storage: Storage,
    private helper_tools: HelperToolsProvider, private events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyOrdersPage');
    this.events.subscribe('CartChanged', () => {
      // this.helper_tools.ShowLoadingSpinnerOnly().then(_ => {
      //   this.helper_tools.DismissLoading();
      //   this.offset = 0;
      //   this.GetAllItemsOrder(this.offset);
      // }).catch(err => {
      //   console.log(err);
      //   this.helper_tools.DismissLoading();
      //   this.helper_tools.ShowBadRequestErrorAlert();
      // })
      this.offset = 0;
      this.GetAllItemsOrder(this.offset);
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

  ionViewCanEnter(): boolean {
    if (this.api.UserData['id']) {
      // login
      return true;
    } else {
      var modal = this.modalCtrl.create('LogInPage');
      modal.present();
      modal.onDidDismiss(Data => {
        this.navCtrl.setRoot('TabsPage');
      })
    }
  }



  GetAllItemsOrder(OFFSET) {
    let DataSent = {
      ID: this.api.UserData['id'],
      offset: OFFSET
    }
    console.log(DataSent);
    this.productController.LoadAllMyOrders(DataSent).subscribe(Data => {
      if (Data['Status'] == 'success') {
        if (OFFSET == 0) {
          this.Orders = Data['message'];
        } else {
          this.Orders = this.Orders.concat(Data['message']);
        }
      } else {
        console.log(Data);
      }
    }, err => {
      console.log(err);
      this.helper_tools.ShowBadRequestErrorAlert();
    })
  }

  GoToDetails(Temp) {
    this.navCtrl.push('MyCartOrdersPage', { OrderItem: Temp });
  }

  DeleteItem(Temp) {
    let DataSent = {
      order_id: Temp['order_id']
    }
    this.productController.DeleteItemOrder(DataSent).subscribe(Data => {
      if (Data['Status'] == 'success') {
        this.helper_tools.showAlertWithOkButton('نجاح', 'تم مسح العنصر بنجاح');
        this.offset = 0;
        this.GetAllItemsOrder(this.offset);
      } else {
        console.log(Data);
        this.helper_tools.ShowBadRequestErrorAlert();
      }
    }, err => {
      console.log(err);
      this.helper_tools.ShowBadRequestErrorAlert();
    })
  }

  LoadInfiniteData() {
    return new Promise((resolve, reject) => {
      this.offset++;
      this.GetAllItemsOrder(this.offset);
      resolve("Done");
    });
  }

  DoInfinite(event) {
    this.LoadInfiniteData().then(_ => {
      event.complete();
    }).catch(err => {
      event.complete();
    });
  }

}
