import { TestBed } from "@angular/core/testing";

import { ErrorService } from "./error.service";

describe("ErrorService", () => {
  let service: ErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorService);
  });

  xit("should be created", () => {
    expect(service).toBeTruthy();
  });
});
