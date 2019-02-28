import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapModalePage } from './map-modale';

@NgModule({
  declarations: [
    MapModalePage,
  ],
  imports: [
    IonicPageModule.forChild(MapModalePage),
  ],
})
export class MapModalePageModule {}
