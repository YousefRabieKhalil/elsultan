import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyOrdersDetailsPage } from './my-orders-details';

@NgModule({
  declarations: [
    MyOrdersDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyOrdersDetailsPage),
  ],
})
export class MyOrdersDetailsPageModule {}
