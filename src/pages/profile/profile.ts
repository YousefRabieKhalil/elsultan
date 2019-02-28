import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelperToolsProvider } from '../../providers/helper-tools/helper-tools';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public loginForm: FormGroup;
  UpdateData = {} as any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder, private helper_tools: HelperToolsProvider,
    private api: ApiProvider, private modalCtrl: ModalController) {
    this.buildForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.helper_tools.ShowLoadingSpinnerOnly().then(_ => {
      this.helper_tools.DismissLoading();
      this.UpdateData = this.api.UserData;
      this.UpdateData['password'] = '';
      this.UpdateData['oldpassword'] = '';
      this.UpdateData['Confirmpassword'] = '';
    }).catch(err => {
      console.log(err);
      this.helper_tools.DismissLoading();
      this.helper_tools.ShowBadRequestErrorAlert();
    })
  }

  GoToChoosenPage(Temp) {
    this.navCtrl.push(Temp);
  }

  UpdateFunc(){
    console.log(this.UpdateData);
    if ((this.UpdateData.password) && (this.UpdateData.password != this.UpdateData.Confirmpassword)) {
      this.helper_tools.showAlertWithOkButton('خطأ', 'كلمتان المرور غير متطابقتين');
      return;
    }
    this.helper_tools.ShowLoadingSpinnerOnly().then(__ => {
        this.api.UpdateUserProfile(this.UpdateData).subscribe(data => {
          this.helper_tools.DismissLoading();
          if (data['Status'] == 'success') {
            this.helper_tools.showAlertWithOkButton('نجاح', 'تم تعديل البيانات بنجاح');
            this.api.UserData = data['message'];
            console.log(data);
            //this.events.publish('UserProfileUpdeted');
            this.navCtrl.setRoot('TabsPage')
          } else {
            if (data['message'] == 'old password not right') {
              this.helper_tools.showAlertWithOkButton('خطأ', 'كلمة المرور الخاصة بك خاطئة');
            } else {
              this.helper_tools.showAlertWithOkButton('خطأ', 'رقم الجوال موجود من قبل من فضلك ادخل رقم جوال اخر');
            }
          }
        }, err => {
          console.log(err);
          this.helper_tools.DismissLoading();
          this.helper_tools.ShowBadRequestErrorAlert();
        })
    }).catch(err => {
      this.helper_tools.DismissLoading();
      this.helper_tools.ShowBadRequestErrorAlert();
    })
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      Fullname: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(6)]], // phone
      TelephoneNumber: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]], // phone
      phoneNumber: [[Validators.required, Validators.maxLength(10), Validators.minLength(10)]], // phone
      passwordMain: ['', [Validators.required, Validators.maxLength(25), Validators.minLength(6)]], // Password
      newpassword: [[Validators.required, Validators.maxLength(25), Validators.minLength(6)]], // Password
      Confirmnewpassword: [[Validators.required, Validators.maxLength(25), Validators.minLength(6)]], // Password
    });
  }

}
