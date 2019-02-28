import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HelperToolsProvider } from '../../providers/helper-tools/helper-tools';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  public loginForm: FormGroup;
  SignUpData = {} as any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
    public formBuilder: FormBuilder, private helper_tools: HelperToolsProvider,
    private api: ApiProvider) {
    this.buildForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  SignUpFunc(){
    this.helper_tools.ShowLoadingSpinnerOnly().then(_ => {
      this.api.UserSignUp(this.SignUpData).subscribe(data => {
        this.helper_tools.DismissLoading();
        if (data['Status'] == 'success') {
          this.helper_tools.showAlertWithOkButton('نجاح', 'تم تسجيل الدخول بنجاح');
          this.api.UserData = data['message'];
          console.log(data);
          this.navCtrl.setRoot('HomePage');
        } else {
          this.helper_tools.showAlertWithOkButton('خطأ', 'رقم الجوال موجود من قبل من فضلك ادخل رقم جوال اخر');
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

  GoDissmiss(){
    this.viewCtrl.dismiss();
  }

  LogIn(){
    this.navCtrl.push('LogInPage');
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(6)]], // phone
      Telephone: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]], // phone
      phone: [[Validators.required, Validators.maxLength(10), Validators.minLength(10)]], // phone
      password: ['', [Validators.required, Validators.maxLength(25), Validators.minLength(6)]], // Password
    });
  }

}
