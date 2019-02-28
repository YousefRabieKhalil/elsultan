import { HelperToolsProvider } from "./../providers/helper-tools/helper-tools";
// import { Camera } from '@ionic-native/camera';
import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { CallNumber } from '@ionic-native/call-number';
import { MyApp } from "./app.component";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { IonicStorageModule } from "@ionic/storage";
import { ApiProvider } from '../providers/api/api';
import { Geolocation } from '@ionic-native/geolocation';
import { DatePicker } from '@ionic-native/date-picker';
import { ProductConntrollerProvider } from '../providers/product-conntroller/product-conntroller';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [MyApp],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }), IonicStorageModule.forRoot({name : "appname"}),
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    StatusBar,
    DatePicker,
    SplashScreen,
    Geolocation,
    CallNumber,
    HelperToolsProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ApiProvider,
    ProductConntrollerProvider,
    ProductConntrollerProvider
  ]
})
export class AppModule {}
