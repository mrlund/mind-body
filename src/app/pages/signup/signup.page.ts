import {
  Component, ViewEncapsulation, OnInit, OnDestroy,
  ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import * as fromRootStore from "../../../girls-platform/state/";
import { Store } from '@ngrx/store';
import { Observable } from "rxjs";
import { takeWhile, filter } from "rxjs/operators";
import { BaseFormComponent } from "@app/shared/components/base-form/base-form.component";
@Component({
  selector: 'gi-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupPage extends BaseFormComponent implements OnInit, OnDestroy {

  signupForm: FormGroup
  submitted = false;
  isLoading$: Observable<boolean>;
  signupError$: Observable<any>;
  alive: boolean = true;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private store: Store<fromRootStore.State>
  ) {
    super();
    this.isLoading$ = this.store.select(fromRootStore.getSignupUserLoading);
    this.signupError$ = this.store.select(fromRootStore.getSignupUserError);
    this.signupError$.pipe(takeWhile(() => this.alive), filter(a => a != null))
      .subscribe(error => {
        if (error) {
          this.handleSubmitError(error, this.signupForm);
          this.cd.markForCheck();
        }
      });
  }
  ngOnDestroy() {
    this.alive = false;
    this.signupForm.reset();
  }


  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.signupForm = this.fb.group({
      Email: ["", Validators.compose([Validators.required, Validators.email])],
      Password: ["", Validators.required],
      ConfirmPassword: ["", Validators.required]
    });
  }
  onSignup() {
    if (this.signupForm.valid) {
      this.submitted = true;
      this.store.dispatch(new fromRootStore.SignupUser(this.signupForm.value));
    }
  }
  onLogin() {
    this.router.navigateByUrl('/login');
  }
}
