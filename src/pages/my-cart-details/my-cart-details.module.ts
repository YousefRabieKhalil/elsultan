import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyCartDetailsPage } from './my-cart-details';

@NgModule({
  declarations: [
    MyCartDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyCartDetailsPage),
  ],
})
export class MyCartDetailsPageModule {}
