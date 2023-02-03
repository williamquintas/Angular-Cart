import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { AdminService } from "./admin.service";

describe("AdminService", () => {
  let service: AdminService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AdminService);
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

    const getAdminRequest = httpController.expectOne(
      `/admins?username=${credentials.username}&password=${credentials.password}`
    );
    expect(getAdminRequest.request.method).toBe("GET");
    getAdminRequest.flush(mockedResponse);

    const authenticationRequest = httpController.expectOne("/auth/login");
    expect(authenticationRequest.request.method).toBe("POST");
    authenticationRequest.flush(mockedResponse);
  });

  it("should fail if do not find admin", () => {
    const credentials = {
      username: "atuny0",
      password: "WRONG_PASSWORD",
    };

    service.login(credentials).subscribe((isAuthenticated) => {
      expect(isAuthenticated).toBeFalse();
      expect(service.isLoggedIn).toBeFalse();
    });

    const getAdminRequest = httpController.expectOne(
      `/admins?username=${credentials.username}&password=${credentials.password}`
    );
    expect(getAdminRequest.request.method).toBe("GET");
    getAdminRequest.flush(null);
  });

  it("should fail if does not have token on response", () => {
    const credentials = {
      username: "atuny0",
      password: "9uQFF1Lh",
    };
    const mockedResponse = {
      token: null,
    };

    service.login(credentials).subscribe((isAuthenticated) => {
      expect(isAuthenticated).toBeFalse();
      expect(service.isLoggedIn).toBeFalse();
    });

    const getAdminRequest = httpController.expectOne(
      `/admins?username=${credentials.username}&password=${credentials.password}`
    );
    expect(getAdminRequest.request.method).toBe("GET");
    getAdminRequest.flush(mockedResponse);

    const testRequest = httpController.expectOne("/auth/login");
    expect(testRequest.request.method).toBe("POST");
    testRequest.flush(mockedResponse);
  });

  it("should successfully logout", () => {
    service.getAdmin().subscribe((admin) => {
      expect(admin).toBeNull();
    });

    service.logout();
  });
});
