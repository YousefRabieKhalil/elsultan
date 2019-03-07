import { HelperToolsProvider } from './../providers/helper-tools/helper-tools';
import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = 'CountryPage';
  constructor(public platform: Platform, private statusBar: StatusBar,private translate: TranslateService,
    private splashScreen: SplashScreen, private helperTools: HelperToolsProvider) {
    this.PlatformIsRead();
  }
  PlatformIsRead() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleLightContent();
      // the options of status bar
      this.statusBar.overlaysWebView(false);
      // set the color of background status bar
      this.statusBar.backgroundColorByHexString('#EC6831');
      // set the color of icons and text of status bar to dark
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  initTranslate() {
    this.translate.use('ar');
    this.platform.setDir('rtl', true);
  }
}

