import { HttpClientModule } from "@angular/common/http";
import { async, TestBed } from "@angular/core/testing";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";

import { of } from "rxjs";
import {
  AdminService,
  AuthenticationService,
  ErrorService,
} from "~core/services";
import { LoginPage } from "./login-page.component";

describe("LoginPage", () => {
  let component: LoginPage;
  let service: AdminService;
  let errorService: ErrorService;
  let formBuilder: FormBuilder;
  let activatedRoute: ActivatedRoute;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
      ],
      providers: [
        LoginPage,
        AuthenticationService,
        FormBuilder,
        ErrorService,
        {
          provide: ActivatedRoute,
          useValue: { queryParams: of({}) },
        },
      ],
    });
    component = TestBed.inject(LoginPage);
    service = TestBed.inject(AdminService);
    formBuilder = TestBed.inject(FormBuilder);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    errorService = TestBed.inject(ErrorService);
  }));

  it("should succesfully login", () => {
    const mockedCredentials = {
      username: "user",
      password: "password",
    };
    spyOn(formBuilder, "group").and.callThrough();
    spyOn(service, "login").and.returnValue(of(true));
    spyOn(component.form, "getRawValue").and.returnValue(mockedCredentials);
    spyOn(router, "navigate").and.returnValue(Promise.resolve(true));
    activatedRoute.queryParams = of({});

    component.login();

    expect(router.navigate).toHaveBeenCalledWith(["admin"]);
  });

  it("should not login", () => {
    const mockedCredentials = {
      username: "user",
      password: "password",
    };
    spyOn(formBuilder, "group").and.callThrough();
    spyOn(service, "login").and.throwError(new Error());
    spyOn(component.form, "getRawValue").and.returnValue(mockedCredentials);
    spyOn(errorService, "open").and.callFake(() => {});
    activatedRoute.queryParams = of({});

    expect(() => component.login()).toThrowError();
  });
});
