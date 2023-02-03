import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { AuthenticationService } from "./authentication.service";

describe("AuthenticationService", () => {
  let service: AuthenticationService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthenticationService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it("should successfully login", () => {
    const credentials = {
      username: "atuny0",
      password: "9uQFF1Lh",
    };
    const mockedResponse = {
      id: 1,
      username: credentials.username,
      email: "some@email.com",
      firstName: "some",
      lastName: "user",
      gender: "some gender",
      image: "https://someurl.com",
      token: "SOME_TOKEN_HERE",
    };

    service.login(credentials).subscribe((isAuthenticated) => {
      expect(isAuthenticated).toBeTrue();
      expect(service.isLoggedIn).toBeTrue();
    });

    const testRequest = httpController.expectOne("/auth/login");
    expect(testRequest.request.method).toBe("POST");
    testRequest.flush(mockedResponse);
  });

  it("should fail if does not have token on response", () => {
    const credentials = {
      username: "atuny0",
      password: "WRONG_PASSWORD",
    };
    const mockedResponse = {
      token: null,
    };

    service.login(credentials).subscribe((isAuthenticated) => {
      expect(isAuthenticated).toBeFalse();
      expect(service.isLoggedIn).toBeFalse();
    });

    const testRequest = httpController.expectOne("/auth/login");
    expect(testRequest.request.method).toBe("POST");
    testRequest.flush(mockedResponse);
  });

  it("should successfully logout", () => {
    service.getUser().subscribe((user) => {
      expect(user).toBeNull();
    });

    service.logout();
  });
});
