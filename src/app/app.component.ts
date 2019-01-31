import { HelperToolsProvider } from './../providers/helper-tools/helper-tools';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = 'HomePage';

  constructor(public platform: Platform, private statusBar: StatusBar,
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
      this.statusBar.backgroundColorByHexString('#efecec');
      // set the color of icons and text of status bar to dark
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.platform.registerBackButtonAction(() => {
        this.helperTools.onRegisterBackButtonFunction();
      }, 1);
    });
  }
}

