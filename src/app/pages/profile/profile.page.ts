import { Component, OnInit } from '@angular/core';
import * as fromRootStore from "../../../girls-platform/state/";
import { Store } from '@ngrx/store';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'gi-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private router: Router,
    private store: Store<fromRootStore.State>,
    public alertController: AlertController) { }

  ngOnInit() {
  }

  async presentLogoutAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Logout',
      message: 'Are you sure want to <strong>logout</strong>?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.store.dispatch(new fromRootStore.LogoutUser());
          }
        }
      ]
    });
    await alert.present();
  }

}
