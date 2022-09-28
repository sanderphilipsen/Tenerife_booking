import { Component, Input } from "@angular/core";
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from "@angular/forms";
import { te } from "date-fns/locale";
import { Tenant } from "src/app/models/tenant";

@Component({
  selector: 'choose-list-item',
  templateUrl:'./customListComponent.html',
  styleUrls: ["customListComponent.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: CustomListComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: CustomListComponent
    }
  ]
})
export class CustomListComponent implements ControlValueAccessor, Validator {

  validate(control: AbstractControl): ValidationErrors | null {

    const val = control.value;
    if (val == null) {
      return {
        CannontBeNull: {
          val
        }
      }
    }
    return null;

  }

  @Input()
  listItems?: Tenant[] = [];


  selectedItem?: Tenant ;

  onChange = (obj: Tenant) => {
    this.selectedItem = obj;
  };

  onTouched = () => {};

  touched = false;

  disabled = false;
  onUpdateTenant(tenant : Tenant) {
    this.markAsTouched();
    if (!this.disabled) {
      this.selectedItem = tenant;
      this.onChange(this.selectedItem);
    }
  }

  writeValue(obj: Tenant): void {
    console.log(obj);
    this.selectedItem = obj

  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }
  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }
  isTenantSelected(tenant : Tenant) : boolean{
    return (tenant.Email == this.selectedItem?.Email 
      && this.selectedItem?.FirstName == tenant.FirstName 
      && this.selectedItem?.Name == tenant.Name)

  }
}
