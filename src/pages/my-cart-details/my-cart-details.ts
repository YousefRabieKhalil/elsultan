import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { ProductConntrollerProvider } from '../../providers/product-conntroller/product-conntroller';
import { ApiProvider } from '../../providers/api/api';
import { HelperToolsProvider } from '../../providers/helper-tools/helper-tools';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the MyCartDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-cart-details',
  templateUrl: 'my-cart-details.html',
})
export class MyCartDetailsPage {
  recive_date;
  recivetime;
  lat = 0;
  lan = 0;
  Green = false;
  Gray = true;
  TotalPrice = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams,private product_controller: ProductConntrollerProvider,
    private datePicker: DatePicker, private modalCtrl: ModalController, private api: ApiProvider,
    private helperTools: HelperToolsProvider, private storage: Storage) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyCartDetailsPage');
    this.recivetime = 'من ٩ صباحا الى ١٢ ظهرا';
    document.getElementById('Selected1').classList.add("Green");
    document.getElementById('Selected2').classList.add("Gray");
    document.getElementById('Selected3').classList.add("Gray");
    for(let i=0; i < this.product_controller.CartAdded.length; i++){
      this.TotalPrice = this.TotalPrice + this.product_controller.CartAdded[i]['totalprice'];
    }
  }

  OpenMap(){
    var modal = this.modalCtrl.create('MapModalePage');
      modal.present();
      modal.onDidDismiss(Data => {
        console.log(Data);
        this.lat = Data.RetreiveLat;
        this.lan = Data.RetreiveLong;
      })
  }

  OpenDate(){
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => this.recive_date = date,
      err => console.log('Error occurred while getting date: ', err)
    );
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

  AddClass1(Temp){
    this.recivetime = Temp;
    document.getElementById('Selected1').classList.remove("Gray");
    document.getElementById('Selected1').classList.add("Green");
    document.getElementById('Selected2').classList.add("Gray");
    document.getElementById('Selected2').classList.remove("Green");
    document.getElementById('Selected3').classList.add("Gray");
    document.getElementById('Selected3').classList.remove("Green");
  }

  AddClass2(Temp){
    this.recivetime = Temp;
    document.getElementById('Selected1').classList.remove("Green");
    document.getElementById('Selected1').classList.add("Gray");
    document.getElementById('Selected2').classList.add("Green");
    document.getElementById('Selected2').classList.remove("Gray");
    document.getElementById('Selected3').classList.add("Gray");
    document.getElementById('Selected3').classList.remove("Green");
  }

  AddClass3(Temp){
    this.recivetime = Temp;
    document.getElementById('Selected1').classList.remove("Green");
    document.getElementById('Selected1').classList.add("Gray");
    document.getElementById('Selected2').classList.add("Gray");
    document.getElementById('Selected2').classList.remove("Green");
    document.getElementById('Selected3').classList.add("Green");
    document.getElementById('Selected3').classList.remove("Gray");
  }

  OrderNow(){
    let DataSent = {
      client_id: this.api.UserData['id'],
      lat: this.lat,
      lan: this.lan,
      recive_date: this.recive_date,
      recivetime: this.recivetime,
      totalprice: this.TotalPrice,
      product: this.product_controller.CartAdded,
      gove_id: this.api.CountryID
    }
    if(this.recive_date){
      this.helperTools.ShowLoadingSpinnerOnly().then(_ => {
        this.product_controller.SubmitOrder(DataSent).subscribe(Data => {
          this.helperTools.DismissLoading();
          if(Data['Status'] == 'success'){
            this.product_controller.CartAdded = [] as any;
            this.storage.remove('CartSaved');
            this.helperTools.showAlertWithOkButton('نجاح', 'تم ارسال طلباتك بنجاح');
            this.navCtrl.setRoot('TabsPage');
          } else{
            console.log(Data);
            this.helperTools.ShowBadRequestErrorAlert();
          }
        }, err => {
          console.log(err);
          this.helperTools.DismissLoading();
          this.helperTools.ShowBadRequestErrorAlert();
        })
      }).catch(err => {
        console.log(err);
        this.helperTools.DismissLoading();
        this.helperTools.ShowBadRequestErrorAlert();
      })
    } else {
      this.helperTools.showAlertWithOkButton('تنبيه', 'من فضلك قم باختيار وقت التوصيل');
    }
  }

}