import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ModalController } from 'ionic-angular';
import { HelperToolsProvider } from '../../providers/helper-tools/helper-tools';
import { ApiProvider } from '../../providers/api/api';
import { CallNumber } from '@ionic-native/call-number';

/**
 * Generated class for the AboutUsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about-us',
  templateUrl: 'about-us.html',
})
export class AboutUsPage {
  ContentData;
  constructor(public navCtrl: NavController, private viewCtrl: ViewController, private api: ApiProvider,
    public navParams: NavParams, private helper_tools: HelperToolsProvider, private modalCtrl: ModalController,
    private alertCtrl: AlertController, private callNumber: CallNumber) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutUsPage');
    this.LoadAllDataOfAboutUs();
  }

  LoadAllDataOfAboutUs() {
    this.helper_tools.ShowLoadingSpinnerOnly().then(_ => {
      this.api.GetAllAboutUsData().subscribe(Data => {
        this.helper_tools.DismissLoading();
        if (Data['Status'] == 'success') {
          this.ContentData = Data['message'];
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

  GoToOpenWindow(TempURL){
    window.open(TempURL);
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

  CallNumber(NumberUser) {
    let alert = this.alertCtrl.create({
      title: 'تنبيه',
      subTitle: ' هل تريد أن تتصل بهذا الرقم' + NumberUser,
      buttons: [{
        text: 'تم',
        handler: () => {
          this.callNumber.callNumber(NumberUser, true)
            .then(res => console.log('Launched dialer!', res))
            .catch(err => console.log('Error launching dialer', err));
        }
      }, {
        text: 'الفاء',
        handler: () => {

        }
      }]
    })
    alert.present();
  }

}
