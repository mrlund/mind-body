import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Store, select } from '@ngrx/store';

import * as fromRootStore from "../girls-platform/state/";
import { Observable } from "rxjs"
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages$;
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private store: Store<fromRootStore.State>,
  ) {
    this.appPages$ = this.store.select(fromRootStore.getTableOfContents);
   
    this.initializeApp();
  }

  initializeApp() {
    this.store.dispatch(new fromRootStore.GetTableOfContent());
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
