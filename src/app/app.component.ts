import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Store, select } from '@ngrx/store';

import * as fromRootStore from "../girls-platform/state/";
import { Observable, of } from "rxjs"
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages$;
  isUserAuthenticate$: Observable<boolean>;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private store: Store<fromRootStore.State>,
  ) {
    this.appPages$ = this.store.select(fromRootStore.getTableOfContents);
    this.isUserAuthenticate$ = this.store.select(fromRootStore.getUserAuthenticated);
    // this.isUserAuthenticate$.subscribe(status => {
    //   if (status) {
    //     this.store.dispatch(new fromRootStore.GetTableOfContent());
    //   }
    //   else {
    //     //this.appPages$ = of([]);
    //   }
    // });

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.store.dispatch(new fromRootStore.CheckUserAuthenticated());
      this.store.dispatch(new fromRootStore.GetTableOfContent());
    });
  }
}
