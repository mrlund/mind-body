import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input
} from "@angular/core";
import {
  FormGroup,
  AbstractControl
} from "@angular/forms";

export interface FormError {
  error: string;
  params: any;
}
@Component({
  selector: 'gi-base-form',
  templateUrl: './base-form.component.html',
  styleUrls: ['./base-form.component.scss']
})
export class BaseFormComponent implements OnInit {
  constructor() { }
  ngOnChanges(change: SimpleChanges) {
  }
  ngOnInit() { }
  protected findFieldControl(field: string, form: FormGroup): AbstractControl {
    let control: AbstractControl;
    if (field === "base") {
      control = form;
    } else if (form.contains(field)) {
      control = form.get(field);
    } else if (
      field.match(/_id$/) &&
      form.contains(field.substring(0, field.length - 3))
    ) {
      control = form.get(field.substring(0, field.length - 3));
    } else if (field.indexOf(".") > 0) {
      let group = form;
      field.split(".").forEach(f => {
        if (group.contains(f)) {
          control = group.get(f);
          if (control instanceof FormGroup) group = control;
        } else {
          control = group;
        }
      });
    } else {
      // Field is not defined in form but there is a validation error for it, set it globally
      control = form;
    }
    return control;
  }
  handleSubmitError(error, form: FormGroup) {
    if (error && error.error) {
      const fields = Object.keys(error.error || {});
      console.log(fields);
      fields.forEach(field => {
        const control = this.findFieldControl(field, form);
        const errors = this.fetchFieldErrors(error.error, field);
        control.markAsTouched();
        control.setErrors(errors);
      });
    }
  }
  protected getErrors(control: AbstractControl): FormError[] {
    return Object.keys(control.errors)
      .filter(error => control.errors[error])
      .map(error => {
        let params = control.errors[error];
        var obj = {
          error: error,
          params: params === true || params == {} ? null : params
        };
        return obj;
      });
  }
  formErrors(form: FormGroup, submitted: boolean): FormError[] {
    if (submitted && form && form.errors) {
      return this.getErrors(form);
    }
  }
  protected fetchFieldErrors(data: any, field: string): any {
    const errors = {};
    data[field].length > 0 && data[field].forEach(e => {
      let name: string = e.error;
      delete e.error;
      errors[field] = e;
    });
    return errors;
  }

  protected fieldErrors(name: string, form: FormGroup, submitted: boolean): FormError[] {
    let control = this.findFieldControl(name, form);
    if (control && (control.touched || submitted) && control.errors) {
      return this.getErrors(control);
    } else {
      return undefined;
    }
  }

  serverErrors(name: string, form: FormGroup, submitted: boolean): FormError[] {
    if (submitted && form && form.get(`${name}`).errors) {
      return this.getErrors(form.get(`${name}`));
    }
  }

}
