import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import * as fromRootStore from "../../../girls-platform/state/";
import { NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { takeWhile, filter } from "rxjs/operators";
import { BaseFormComponent } from "@app/shared/components/base-form/base-form.component";
@Component({
  selector: 'gi-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage extends BaseFormComponent implements OnInit, OnDestroy {
  profileForm: FormGroup
  submitted = false;
  userInfoLoaing$: Observable<boolean>;
  userInfoError$: Observable<any>;
  updateUserInfoLoading$: Observable<boolean>;
  updateUserInfoError$: Observable<any>;
  userInfo$: Observable<any>;
  alive: boolean = true;
  constructor(private router: Router,
    private store: Store<fromRootStore.State>,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    public alertController: AlertController) {
    super();
    this.createForm();
    this.userInfoLoaing$ = this.store.select(fromRootStore.getUserInfoError);
    this.userInfoError$ = this.store.select(fromRootStore.getUserInfoLoading);
    this.updateUserInfoLoading$ = this.store.select(fromRootStore.getUpdateUserInfoLoading);
    this.updateUserInfoError$ = this.store.select(fromRootStore.getUpdateUserInfoError);
    this.userInfo$ = this.store.select(fromRootStore.getUserInfo);
    this.userInfo$.pipe(takeWhile(() => this.alive), filter(a => a != null))
      .subscribe(user => {
        if (user) {
          this.profileForm.patchValue(user);
        }
      });
    this.updateUserInfoError$.pipe(takeWhile(() => this.alive), filter(a => a != null))
      .subscribe(error => {
        if (error) {
          this.handleSubmitError(error, this.profileForm);
          this.cd.markForCheck();
        }
      });

  }
  createForm() {
    this.profileForm = this.fb.group({
      Name: ["", Validators.required],
      ProfileImageUrl: [""]
    });
  }
  ngOnInit() {
    this.store.dispatch(new fromRootStore.GetUserInfo());
  }

  updateUserInfo() {
    if (this.profileForm.valid)
      this.store.dispatch(new fromRootStore.UpdateUserInfo(this.profileForm.value));
  }

  ngOnDestroy() {
    this.alive = false;
    this.profileForm.reset();
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
