import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { IUser } from "../../shared/interfaces";

import { UserService } from "./user.service";

describe("UserService", () => {
  let service: UserService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UserService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it("should create a new user", () => {
    const mockedItem: IUser = {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "kenaa@example.com",
      username: "jhondoe",
      gender: "male",
      image: "http://",
    };

    service.create(mockedItem).subscribe((response) => {
      expect(response).toBeUndefined();
    });

    const testRequest = httpController.expectOne("/users");
    expect(testRequest.request.method).toBe("POST");
    testRequest.flush(mockedItem);
  });

  it("should update an existing product", () => {
    const mockedItem: IUser = {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "kenaa@example.com",
      username: "jhondoe",
      gender: "male",
      image: "http://",
    };

    service.update(mockedItem).subscribe((response) => {
      expect(response).toBeUndefined();
    });

    const testRequest = httpController.expectOne(`/users/${mockedItem.id}`);
    expect(testRequest.request.method).toBe("PUT");
    testRequest.flush(mockedItem);
  });
});
