import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from 'src/core/core.module';
import { StoreModule } from '@ngrx/store';
import { ComponentsModule } from 'src/shared/components/components.module';

@NgModule({
  declarations: [AppComponent],
  imports: [CoreModule, AppRoutingModule, ComponentsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
