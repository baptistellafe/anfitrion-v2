import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo/logo.component';
import { IonicModule } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
import { LanguageButtonComponent } from './language-button/language-button.component';
import { CityButtonComponent } from './city-button/city-button.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { HelpButtonComponent } from './help-button/help-button.component';
import { LanguageButtonJustIconComponent } from './language-button-just-icon/language-button-just-icon.component';
register();

@NgModule({
  declarations: [
    LogoComponent,
    LanguageButtonComponent,
    CityButtonComponent,
    HeaderComponent,
    HelpButtonComponent,
    LanguageButtonJustIconComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [
    LogoComponent,
    LanguageButtonComponent,
    CityButtonComponent,
    HeaderComponent,
    HelpButtonComponent,
    LanguageButtonJustIconComponent
  ]
})
export class ComponentsModule { }
