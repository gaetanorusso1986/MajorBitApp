import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenericPageRoutingModule } from './generic-routing.module';

import { GenericPage } from './generic.page';
import {ComponentsModule} from '../Components/Components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    GenericPageRoutingModule
  ],
  declarations: [GenericPage]
})
export class GenericPageModule {}
