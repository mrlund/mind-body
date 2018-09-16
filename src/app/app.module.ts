import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouteReuseStrategy, Routes } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from "@ngrx/router-store";
import { effects, CustomSerializer, reducers } from '../girls-platform/state';
import { courseContentFactoryProvider, JsonContentProvider } from '../girls-platform/services/JsonContentProvider';
import { HttpClientModule } from '@angular/common/http';

import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment"
import { CreateJsService } from '../girls-platform/services/CreateJsService';

import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';
import { SignalRService } from '../girls-platform/services/SignalRService';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ComponentsModule,
    FormsModule,
    CoreModule,
    SharedModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production // Restrict extension to log-only mode
    }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'routerReducer', // name of reducer key
    }),
    EffectsModule.forRoot(effects)
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: tocProviderFactory,
      multi: true,
      deps: [JsonContentProvider]
    },
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    courseContentFactoryProvider,
    JsonContentProvider,
    SignalRService,
    CreateJsService,
    {
      provide: RouterStateSerializer,
      useClass: CustomSerializer
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function tocProviderFactory(provider: JsonContentProvider) {
  return () => provider.getTOC();
}

