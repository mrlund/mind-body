import {
  Component, OnInit, ViewEncapsulation, OnDestroy,
  ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { NgForm, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import * as fromRootStore from "../../../girls-platform/state/";
import { Store } from '@ngrx/store';
import { Observable } from "rxjs";

import { takeWhile, filter } from "rxjs/operators";
import { BaseFormComponent } from "@app/shared/components/base-form/base-form.component";
import { AuthService } from "@app/core/services/auth.service";
@Component({
  selector: 'gi-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPage extends BaseFormComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  private alive = true;
  returnUrl: string;
  submitted = false;
  isLoading$: Observable<boolean>;
  loginError$: Observable<any>;
  constructor(
    public router: Router,
    public fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private authService: AuthService,
    private store: Store<fromRootStore.State>,
  ) {
    super();
    this.isLoading$ = this.store.select(fromRootStore.getLoginUserLoading);
    this.loginError$ = this.store.select(fromRootStore.getLoginUserError);
    this.loginError$.pipe(takeWhile(() => this.alive), filter(a => a != null))
      .subscribe(error => {
        if (error) {
          this.handleSubmitError(error, this.loginForm);
          this.cd.markForCheck();
        }
      });
  }
  ngOnDestroy() {
    this.alive = false;
    this.loginForm.reset();
  }
  ngOnInit() {
    this.createForm();
  }
  ionViewDidLeave() {
  }

  createForm() {
    this.loginForm = this.fb.group({
      Email: ["", Validators.required],
      Password: ["", Validators.required]
    });
  }


  onLogin() {
    if (this.loginForm.valid) {
      this.submitted = true;
      this.store.dispatch(new fromRootStore.LoginUser({ model: this.loginForm.value, returnUrl: "/home" }));
    }
  }
  onLoginWithGoogle() {
    this.authService.loginWithGoogle();
  }
  onForgotPasword() {
    this.router.navigateByUrl('/forgot-password');
  }
  onSignup() {
    this.router.navigateByUrl('/signup');
  }
}
