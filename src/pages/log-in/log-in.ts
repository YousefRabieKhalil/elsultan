import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, Events } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HelperToolsProvider } from '../../providers/helper-tools/helper-tools';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LogInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-log-in',
  templateUrl: 'log-in.html',
})
export class LogInPage {
  public loginForm: FormGroup;
  LoginData = {} as any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private helper_tools: HelperToolsProvider,
    public formBuilder: FormBuilder, private api: ApiProvider, private modalCtrl: ModalController,
    private viewCtrl: ViewController, private storage: Storage, private events: Events) {
    this.buildForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogInPage');
  }

  GoToSignUp(){
    var modal = this.modalCtrl.create('SignUpPage');
    modal.present();
    modal.onDidDismiss(Data => {
      this.navCtrl.setRoot('TabsPage');
    })
  }

  GoToDissmiss(){
    this.viewCtrl.dismiss();
  }

  LoInFunc(){
    this.helper_tools.ShowLoadingSpinnerOnly().then(_ => {
      this.api.UserLogIn(this.LoginData).subscribe(Data => {
        console.log(Data);
        this.helper_tools.DismissLoading();
        if(Data['Status'] == 'success'){
          this.helper_tools.showAlertWithOkButton('نجاح', 'تم تسجيل الدخول بنجاح');
          this.api.UserData = Data['message'];
          console.log(Data);
          this.navCtrl.setRoot('TabsPage');
        } else {
          this.helper_tools.showAlertWithOkButton('خطأ', 'رقم الجوال او كلمة المرور غير صحيحة' );
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

  buildForm() {
    this.loginForm = this.formBuilder.group({
      phone: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]], // phone
      password: ['', [Validators.required, Validators.maxLength(25), Validators.minLength(6)]], // Password
    });
  }

}
