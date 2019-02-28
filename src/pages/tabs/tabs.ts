import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs, Events } from 'ionic-angular';
import { HelperToolsProvider } from '../../providers/helper-tools/helper-tools';
import { ApiProvider } from '../../providers/api/api';

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
  pageindex = { 'AboutUsPage': 4, 'CartPage': 1, 'MyOrdersPage': 2, 'WayUsPage': 3,'HomePage': 0 }
  @ViewChild('MainTabs') MainTabs: Tabs;
  constructor(public navCtrl: NavController, public navParams: NavParams, private helper_tools: HelperToolsProvider,
    private events: Events, private api: ApiProvider) {
      this.NumberOfOrders = this.api.NumberOrders;
      this.events.subscribe('TabChanged', data => {
        this.MainTabs.select(this.pageindex[data.pageID]);
        console.log(this.pageindex[data.pageID])
      })
      this.events.subscribe('NumberOfOrders', () => {
        this.NumberOfOrders = this.api.NumberOrders;
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

  onTabsChange() {
    this.helper_tools.SelectedTab = this.MainTabs.getSelected().index;
    console.log(this.MainTabs.getSelected().index);
  }

}
