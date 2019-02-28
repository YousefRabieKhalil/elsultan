import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { HelperToolsProvider } from '../../providers/helper-tools/helper-tools';

/**
 * Generated class for the WayUsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-way-us',
  templateUrl: 'way-us.html',
})
export class WayUsPage {
  InstituteHelp = '';
  constructor(public navCtrl: NavController, public navParams: NavParams,private helper_tools: HelperToolsProvider,
    private api: ApiProvider, private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WayUsPage');
    this.helper_tools.SelectedTab = 3;
    this.LoadAllDataOfAboutUs();
  }

  LoadAllDataOfAboutUs() {
    this.helper_tools.ShowLoadingSpinnerOnly().then(_ => {
      this.api.GetAllAboutUsData().subscribe(Data => {
        this.helper_tools.DismissLoading();
        if (Data['Status'] == 'success') {
          this.InstituteHelp = Data['message']['institute'];
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

}
