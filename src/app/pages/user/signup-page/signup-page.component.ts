import { Component } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  of,
  Subject,
  switchMap,
} from "rxjs";
import { AddressService, UserService } from "~core/services";

@Component({
  selector: "app-signup-page",
  templateUrl: "./signup-page.component.html",
  styleUrls: ["./signup-page.component.scss"],
})
export class SignupPage {
  isComponentDestroyed$ = new Subject<boolean>();
  form!: FormGroup;

  isLoadingAddress$ = new BehaviorSubject<boolean>(false);

  constructor(
    private formBuilder: FormBuilder,
    private addressService: AddressService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();

    this.form
      .get("zipcode")
      ?.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((zipcode) => {
          if (zipcode.length === 8 && this.form.get("zipcode")?.valid) {
            this.isLoadingAddress$.next(true);
            return this.addressService.getAddressByZipCode(zipcode);
          }
          return of(undefined);
        })
      )
      .subscribe({
        next: (address) => {
          this.form.patchValue({
            street: address?.["logradouro"],
            neighborhood: address?.["bairro"],
            city: address?.["localidade"],
            state: address?.["uf"],
          });
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          this.isLoadingAddress$.next(false);
        },
      });
  }

  ngOnDestroy() {
    this.isComponentDestroyed$.next(true);
    this.isComponentDestroyed$.complete();
  }

  initForm() {
    this.form = this.formBuilder.group(
      {
        email: new FormControl("", [Validators.email, Validators.required]),
        firstName: new FormControl("", [Validators.required]),
        lastName: new FormControl("", [Validators.required]),
        userName: new FormControl("", [Validators.required]),
        phoneNumber: new FormControl("", [
          Validators.minLength(8),
          Validators.maxLength(11),
          Validators.required,
        ]),
        password: new FormControl("", [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl("", [Validators.required]),
        zipcode: new FormControl("", [Validators.required]),
        street: new FormControl("", [Validators.required]),
        number: new FormControl("", [Validators.required]),
        complement: new FormControl(""),
        neighborhood: new FormControl("", [Validators.required]),
        city: new FormControl("", [Validators.required]),
        state: new FormControl("", [Validators.required]),

        acceptNewsletter: new FormControl(false, []),
        acceptPrivacyPolicy: new FormControl(false, [Validators.required]),
        acceptDataUsage: new FormControl(false, [Validators.required]),
      },
      {
        validator: (
          formGroup: AbstractControl
        ): { shouldMatch: boolean } | null =>
          formGroup.get("password")?.value !==
          formGroup.get("confirmPassword")?.value
            ? {
                shouldMatch: true,
              }
            : null,
      }
    );
  }

  saveUser() {
    console.log(this.form);
    if (this.form.valid) {
      const {
        zipcode,
        street,
        number,
        complement,
        neighborhood,
        city,
        state,
        confirmPassword,
        ...user
      } = this.form.value;

      this.userService
        .create({
          ...user,
          addresses: [
            { zipcode, street, number, complement, neighborhood, city, state },
          ],
        })
        .subscribe({
          next: () => {
            this.router.navigate(["user", "login"]);
          },
        });
    }
  }
}
