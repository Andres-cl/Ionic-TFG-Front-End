import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {ComponentsModule} from "./components/components.module";

import {AppGlobals} from "./services/variablesGlobales";
import {RecaptchaModule} from "ng-recaptcha";
import {IonicStorageModule} from "@ionic/storage";
import {HttpClientJsonpModule, HttpClientModule} from "@angular/common/http";
import { HTTP } from '@ionic-native/http/ngx';
import {Base64} from "@ionic-native/base64/ngx";
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { AppLauncher } from '@ionic-native/app-launcher/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ComponentsModule, HttpClientModule,RecaptchaModule.forRoot(),IonicStorageModule.forRoot(), HttpClientJsonpModule],
  providers: [
    StatusBar,
    SplashScreen,
      AppGlobals,
      HTTP,
      Base64,
      InAppBrowser,
      ScreenOrientation,
      AppLauncher,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
