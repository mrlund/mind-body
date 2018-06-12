import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Store, select } from '@ngrx/store';
import { AppState } from '../girls-platform/state/table-of-content-state';
import { GET_TABLE_OF_CONTENT } from '../girls-platform/state/table-of-content-actions';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages$;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private store: Store<AppState>
  ) {
    this.appPages$ = this.store.pipe(select('TableOfContentReducer'));
    this.initializeApp();
  }

  initializeApp() {
    this.store.dispatch({type: GET_TABLE_OF_CONTENT});
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
