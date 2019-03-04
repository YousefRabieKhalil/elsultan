import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HelperToolsProvider } from '../../providers/helper-tools/helper-tools';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the CountryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-country',
  templateUrl: 'country.html',
})
export class CountryPage {
  Countries;
  constructor(public navCtrl: NavController, public navParams: NavParams, private helper_tools: HelperToolsProvider,
    private api: ApiProvider, private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CountryPage');
    this.LoadAllCountries();
  }

  LoadAllCountries() {
    this.helper_tools.ShowLoadingSpinnerOnly().then(_ => {
      this.api.GetAllCountries().subscribe(Data => {
        if(Data['Status'] == 'success'){
          this.Countries = Data['message'];
          this.helper_tools.DismissLoading();
        }else {
          console.log(Data);
          this.helper_tools.DismissLoading();
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

  // GoToChoosenPage(Temp) {
  //   if (Temp == 'ProfilePage' && !this.api.UserData['id']) {
  //     var modal = this.modalCtrl.create('LogInPage');
  //     modal.present();
  //     modal.onDidDismiss(Data => {
  //       this.navCtrl.setRoot('TabsPage');
  //     })
  //   } else {
  //     this.navCtrl.push(Temp);
  //   }
  // }

  // OpenLink(){
  //   window.open('http://www.facebook.com');
  // }

  GoToHome(Temp) {
    this.api.CountryID = Temp;
    this.navCtrl.push('TabsPage');
  }

  url(id) {
    switch (id) {
      case 1:
        return ("url('assets/imgs/1.png')");
      case 2:
        return ("url('assets/imgs/3.png')");
      case 3:
        return ("url('assets/imgs/4.png')");
    }
  }

}
