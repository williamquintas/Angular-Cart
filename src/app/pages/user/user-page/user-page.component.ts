import { ChangeDetectionStrategy, Component } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { BehaviorSubject, first, Subject, takeUntil } from "rxjs";
import {
  AuthenticationService,
  ErrorService,
  UserService,
} from "~core/services";
import { IUser, IUserAddress } from "~shared/interfaces";

@Component({
  selector: "app-user-page",
  templateUrl: "./user-page.component.html",
  styleUrls: ["./user-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPage {
  isComponentDestroyed$ = new Subject<boolean>();
  isLoading$ = new Subject<boolean>();

  isEditing$ = new BehaviorSubject<boolean>(false);

  user!: IUser;
  form!: FormGroup;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private errorService: ErrorService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.authenticationService
      .getUser()
      .pipe(takeUntil(this.isComponentDestroyed$))
      .subscribe({
        next: (user) => {
          if (user) {
            this.user = user;
          }
          this.initForm();
        },
        error: (error) => {
          this.errorService.open(error);
        },
      });
  }

  ngOnDestroy() {
    this.isComponentDestroyed$.next(true);
    this.isComponentDestroyed$.complete();
  }

  initForm() {
    this.form = this.formBuilder.group({
      email: new FormControl({ value: this.user.email, disabled: true }, [
        Validators.email,
        Validators.required,
      ]),
      firstName: new FormControl(
        { value: this.user.firstName, disabled: true },
        [Validators.required]
      ),
      lastName: new FormControl({ value: this.user.lastName, disabled: true }, [
        Validators.required,
      ]),
      userName: new FormControl({ value: this.user.username, disabled: true }, [
        Validators.required,
      ]),
      phoneNumber: new FormControl(
        { value: this.user.phoneNumber, disabled: true },
        [Validators.minLength(8), Validators.maxLength(11), Validators.required]
      ),
      addresses: this.formBuilder.array(
        this.user.addresses?.map(this.buildAddressForm) ?? []
      ),

      acceptNewsletter: new FormControl({ value: false, disabled: true }, []),
    });
  }

  buildAddressForm = (address: IUserAddress) => {
    const { zipcode, street, number, complement, neighborhood, city, state } =
      address;
    let isDisabled = true;
    this.isEditing$
      .pipe(takeUntil(this.isComponentDestroyed$))
      .subscribe((isEditing) => {
        isDisabled = !isEditing;
      });

    return this.formBuilder.group({
      zipcode: new FormControl({ value: zipcode, disabled: isDisabled }, [
        Validators.required,
      ]),
      street: new FormControl({ value: street, disabled: isDisabled }, [
        Validators.required,
      ]),
      number: new FormControl({ value: number, disabled: isDisabled }, [
        Validators.required,
      ]),
      complement: new FormControl({
        value: complement,
        disabled: isDisabled,
      }),
      neighborhood: new FormControl(
        { value: neighborhood, disabled: isDisabled },
        [Validators.required]
      ),
      city: new FormControl({ value: city, disabled: isDisabled }, [
        Validators.required,
      ]),
      state: new FormControl({ value: state, disabled: isDisabled }, [
        Validators.required,
      ]),
    });
  };

  get addresses() {
    return this.form.controls["addresses"] as FormArray;
  }

  addAddress() {
    this.addresses.push(
      this.buildAddressForm({
        zipcode: "",
        street: "",
        number: "",
        complement: "",
        neighborhood: "",
        city: "",
        state: "",
      })
    );
  }

  deleteAddress(index: number) {
    this.addresses.removeAt(index);
  }

  logout() {
    this.isLoading$.next(true);
    this.authenticationService.logout();
    this.router.navigate(["user", "login"]);
    this.isLoading$.next(false);
  }

  editUser() {
    this.isEditing$.next(true);
    Object.keys(this.form.controls).forEach((key) => {
      this.form.controls[key]?.enable();
    });
    this.addresses.controls.forEach((control) => {
      control.enable();
    });
  }

  saveUser() {
    if (this.form.valid) {
      this.isEditing$.next(true);
      this.userService
        .update({ ...this.user, ...this.form.getRawValue() })
        .pipe(first())
        .subscribe({
          next: () => {
            Object.keys(this.form.controls).forEach((key) => {
              this.form.controls[key]?.disable();
            });
            this.user = { ...this.user, ...(this.form.getRawValue() as IUser) };
            this.isEditing$.next(false);
          },
        });
    }
  }
}
