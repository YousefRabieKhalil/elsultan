import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs, Events } from 'ionic-angular';
import { HelperToolsProvider } from '../../providers/helper-tools/helper-tools';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  NumberOfOrders = 0;
  HomePage = 'HomePage';
  AboutUsPage = 'AboutUsPage';
  CartPage = 'CartPage';
  MyOrdersPage = 'MyOrdersPage';
  WayUsPage = 'WayUsPage';
  pageindex = { 'AboutUsPage': 4, 'CartPage': 1, 'MyOrdersPage': 2, 'WayUsPage': 3, 'HomePage': 0 }
  @ViewChild('MainTabs') MainTabs: Tabs;
  constructor(public navCtrl: NavController, public navParams: NavParams, private helper_tools: HelperToolsProvider,
    private events: Events, private api: ApiProvider) {
    this.NumberOfOrders = this.api.NumberOrders;
    this.events.subscribe('TabChanged', () => {

    })
    this.events.subscribe('NumberOfOrders', () => {
      this.NumberOfOrders = this.api.NumberOrders;
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
    this.LoadAllCountries();
  }

  LoadAllCountries() {
    this.helper_tools.ShowLoadingSpinnerOnly().then(_ => {
      this.api.GetAllCountries().subscribe(Data => {
        if(Data['Status'] == 'success'){
          this.api.CountryID = Data['message'][0];
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

  onTabsChange() {
    this.helper_tools.SelectedTab = this.MainTabs.getSelected().index;
    this.events.publish('CartChanged');
    console.log(this.MainTabs.getSelected().index);
  }

}
