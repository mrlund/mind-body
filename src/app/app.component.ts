import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Store, select } from '@ngrx/store';

import * as fromRootStore from "../girls-platform/state/";
import { Observable, of } from "rxjs"
import { ActivatedRoute, Router, NavigationEnd, ActivatedRouteSnapshot } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages$;
  appPages;
  isUserAuthenticate$: Observable<boolean>;
  classRoomMode$: Observable<boolean>;
  pageUrlName: string = "";
  sessionUrlName: string = ""
  url: string = "";
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private store: Store<fromRootStore.State>,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.appPages$ = this.store.select(fromRootStore.getTableOfContents);
    this.isUserAuthenticate$ = this.store.select(fromRootStore.getUserAuthenticated);
    this.classRoomMode$ = this.store.select(fromRootStore.getClassRoomMode);
    // this.isUserAuthenticate$.subscribe(status => {
    //   if (status) {
    //     this.store.dispatch(new fromRootStore.GetTableOfContent());
    //   }
    //   else {
    //     //this.appPages$ = of([]);
    //   }
    // });
    this.appPages$.subscribe(data => {
      this.appPages = data;
    })
    this.initializeApp();
  }

  classRoomModeChange(val) {
    this.store.dispatch(new fromRootStore.SetClassRoomMode(val))
  }

  // toggleSection(i) {
  //   this.appPages[i].open = !this.appPages[i].open;
  // }

  toggleSection(i) {
    //this.appPages.courseModules[i].open = !this.appPages.courseModules[i].open;
    this.appPages.courseModules.map((listItem, index) => {
      if (i == index) {
        listItem.open = !listItem.open;
      } else {
        listItem.open = false;
      }
      return listItem;
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.store.dispatch(new fromRootStore.CheckUserAuthenticated());
      this.store.dispatch(new fromRootStore.GetTableOfContent());

      this.router.events.subscribe((val) => {
        if (val instanceof NavigationEnd) {
          this.url = this.router.url;
          var urlParts = this.router.url.split('/');
          this.pageUrlName = urlParts[2];
          this.sessionUrlName = urlParts[3];
        }
      });
    });
  }
}
