import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyCartOrdersPage } from './my-cart-orders';

@NgModule({
  declarations: [
    MyCartOrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(MyCartOrdersPage),
  ],
})
export class MyCartOrdersPageModule {}
