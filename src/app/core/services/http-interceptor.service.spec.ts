import { HttpClient, HTTP_INTERCEPTORS } from "@angular/common/http";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import config from "~shared/data/config.json";
import { HttpInterceptorService } from "./http-interceptor.service";

describe("MyInterceptor", () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpInterceptorService,
          multi: true,
        },
      ],
    });
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should add authorization header", () => {
    httpClient.get("/products").subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const testRequest = httpMock.expectOne(`${config.serverURL}/products`);
    expect(testRequest.request.headers.has("Authorization")).toBeTruthy();

    testRequest.flush([]);
  });
});
