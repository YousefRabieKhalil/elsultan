import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HelperToolsProvider } from '../../providers/helper-tools/helper-tools';
import { ApiProvider } from '../../providers/api/api';
import { SharedClass } from '../../providers/SharedClass';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  Products = [] as any;
  ImageLink;
  OneProduct;
  constructor(public navCtrl: NavController, private modalCtrl: ModalController,
    public navParams: NavParams, private helper_tools: HelperToolsProvider,
    private api: ApiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.ImageLink = SharedClass.BASE_URL_IMAGE;
    this.LoadAllProducts();
    if(this.Products.length % 2 != 0 && this.Products.length != 1){
      this.OneProduct = this.Products.pop();
    }
  }

  // GoToOpenWindow(){
  //   window.open('http://www.facebook.com');
  // }

  LoadAllProducts(){
    this.helper_tools.ShowLoadingSpinnerOnly().then(_ => {
      this.api.GetAllProducts().subscribe(Data => {
        if(Data['Status'] == 'success'){
          this.Products = Data['message'];
          this.helper_tools.DismissLoading();
        } else{
          console.log(Data);
          this.helper_tools.DismissLoading();
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

  GotDetails(Temp){
    this.navCtrl.push('MyOrdersDetailsPage', { DetailsOfOrder: Temp } );
  }

}
