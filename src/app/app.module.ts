import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PagesModule } from './pages/pages.module';
import { AppRoutingModule } from './app.routing.module';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localePtBr from '@angular/common/locales/pt';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

registerLocaleData(localePtBr, 'pt-BR');
// const overrides = <any>{
//   // override hammerjs default configuration
//   'pan': { threshold: 5 },
//   'swipe': {
//     velocity: 0.4,
//     threshold: 20,
//     direction: 31 // /!\ ugly hack to allow swipe in all direction
//   }
// };

@NgModule({
  providers: [
    { provide: 'pt-BR', useValue: 'pt-BR' },
  ],
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    SharedModule,
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PagesModule
  ],
  exports: [
    HttpClientModule,
    SharedModule,
    CommonModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
