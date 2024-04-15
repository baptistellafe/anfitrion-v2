import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo/logo.component';
import { IonicModule } from '@ionic/angular';
import { LanguageButtonComponent } from './language-button/language-button.component';
import { CityButtonComponent } from './city-button/city-button.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { HelpButtonComponent } from './help-button/help-button.component';
import { LanguageButtonJustIconComponent } from './language-button-just-icon/language-button-just-icon.component';
import { SugestCardComponent } from './sugest-card/sugest-card.component';
import { ScrollDownComponent } from './scroll-down/scroll-down.component';
import { FooterComponent } from './footer/footer.component';
import { MadeWLoveComponent } from './made-w-love/made-w-love.component';
import { CopyrightComponent } from './copyright/copyright.component';
import { CategoryCardComponent } from './category-card/category-card.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    LogoComponent,
    LanguageButtonComponent,
    CityButtonComponent,
    HeaderComponent,
    HelpButtonComponent,
    LanguageButtonJustIconComponent,
    SugestCardComponent,
    ScrollDownComponent,
    FooterComponent,
    MadeWLoveComponent,
    CopyrightComponent,
    CategoryCardComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    TranslateModule
  ],
  exports: [
    LogoComponent,
    LanguageButtonComponent,
    CityButtonComponent,
    HeaderComponent,
    HelpButtonComponent,
    LanguageButtonJustIconComponent,
    SugestCardComponent,
    ScrollDownComponent,
    FooterComponent,
    MadeWLoveComponent,
    CopyrightComponent,
    CategoryCardComponent
  ]
})
export class ComponentsModule { }
