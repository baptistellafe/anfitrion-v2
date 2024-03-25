import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo/logo.component';
import { IonicModule } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
import { LanguageButtonComponent } from './language-button/language-button.component';
import { CityButtonComponent } from './city-button/city-button.component';
import { FormsModule } from '@angular/forms';
register();

@NgModule({
  declarations: [
    LogoComponent,
    LanguageButtonComponent,
    CityButtonComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [
    LogoComponent,
    LanguageButtonComponent,
    CityButtonComponent
  ]
})
export class ComponentsModule { }
