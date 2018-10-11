import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
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
  profileForm: FormGroup;
  enrollForm: FormGroup;
  submitted = false;
  enrollLoading$: Observable<boolean>;
  enrollError$: Observable<any>;
  leaveError$: Observable<any>;
  enrollSuccess$: Observable<any>;
  leaveSuccess$: Observable<any>;
  userInfoLoaing$: Observable<boolean>;
  userInfoError$: Observable<any>;
  updateUserInfoLoading$: Observable<boolean>;
  updateUserInfoError$: Observable<any>;
  uploadUserImageLoading$: Observable<boolean>;
  uploadUserImageError$: Observable<any>;
  userInfo$: Observable<any>;
  enrollmentList$: Observable<any[]>
  enrollListLoading$: Observable<boolean>
  alive: boolean = true;
  @ViewChild("fileInput") fileInput: ElementRef;
  constructor(private router: Router,
    private store: Store<fromRootStore.State>,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    public alertController: AlertController) {
    super();
    this.createForm();
    this.userInfoLoaing$ = this.store.select(fromRootStore.getUserInfoLoading);
    this.enrollLoading$ = this.store.select(fromRootStore.getEnrollLoading);
    this.enrollListLoading$ = this.store.select(fromRootStore.getEnrollListLoading);
    this.enrollmentList$ = this.store.select(fromRootStore.getEnrollList);
    this.userInfoError$ = this.store.select(fromRootStore.getUserInfoError);
    this.updateUserInfoLoading$ = this.store.select(fromRootStore.getUpdateUserInfoLoading);
    this.updateUserInfoError$ = this.store.select(fromRootStore.getUpdateUserInfoError);
    this.uploadUserImageLoading$ = this.store.select(fromRootStore.getUploadUserImageLoading);
    this.uploadUserImageError$ = this.store.select(fromRootStore.getUploadUserImageError);
    this.userInfo$ = this.store.select(fromRootStore.getUserInfo);
    this.enrollError$ = this.store.select(fromRootStore.getEnrollError);
    this.enrollSuccess$ = this.store.select(fromRootStore.getEnrollComplete);
    this.leaveError$ = this.store.select(fromRootStore.getLeaveClassError);
    this.leaveSuccess$ = this.store.select(fromRootStore.getLeaveClassComplete);
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

    this.enrollSuccess$.pipe(takeWhile(() => this.alive), filter(a => a != null))
      .subscribe(success => {
        if (success) {
          this.enrollForm.reset();
        }
      });

  }
  selectFile() {
    this.fileInput.nativeElement.click();
  }
  uploadImage(event: any) {
    this.submitted = true;
    if (event.target.files && event.target.files[0]) {
      this.store.dispatch(new fromRootStore.UploadProfileImage({ files: event.target.files }))
    }
  }
  createForm() {
    this.profileForm = this.fb.group({
      Name: ["", Validators.required],
      ProfileImageUrl: [""]
    });
    this.enrollForm = this.fb.group({
      ShortCode: ["", Validators.required]
    });
  }
  ngOnInit() {
    this.store.dispatch(new fromRootStore.GetUserInfo());
    this.store.dispatch(new fromRootStore.GetEnrollList());
  }

  updateUserInfo() {
    if (this.profileForm.valid)
      this.store.dispatch(new fromRootStore.UpdateUserInfo(this.profileForm.value));
  }

  ngOnDestroy() {
    this.alive = false;
    this.profileForm.reset();
  }
  enrollToClass() {
    if (this.enrollForm.valid) {
      this.store.dispatch(new fromRootStore.EnrollClass(this.enrollForm.get('ShortCode').value));
    }
  }
  async leaveClass(obj: any) {
    const alert = await this.alertController.create({
      header: 'Leave Class',
      message: `Are you sure want to leave class <strong>${obj.Name}</strong>?`,
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
            this.store.dispatch(new fromRootStore.LeaverClass(obj.Id));
          }
        }
      ]
    });
    await alert.present();

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
