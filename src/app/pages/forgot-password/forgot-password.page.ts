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
@Component({
  selector: 'gi-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordPage extends BaseFormComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  private alive = true;
  submitted = false;
  isLoading$: Observable<boolean>;
  forgotPasswordError$: Observable<any>;
  constructor(
    public router: Router,
    public fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private store: Store<fromRootStore.State>,
  ) {
    super();
    this.isLoading$ = this.store.select(fromRootStore.getForgotPasswordLoading);
    this.forgotPasswordError$ = this.store.select(fromRootStore.getForgotPasswordError);
    this.forgotPasswordError$.pipe(takeWhile(() => this.alive), filter(a => a != null))
      .subscribe(error => {
        console.log(error);
        if (error) {
          this.handleSubmitError(error, this.forgotPasswordForm);
          this.cd.markForCheck();
        }
      });
  }
  ngOnDestroy() {
    this.alive = false;
    this.forgotPasswordForm.reset();
  }
  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.forgotPasswordForm = this.fb.group({
      Email: ["", Validators.compose([Validators.required, Validators.email])]
    });
  }


  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.submitted = true;
      this.store.dispatch(new fromRootStore.ForgotPasswordRequest(this.forgotPasswordForm.value));
    }
  }


}
