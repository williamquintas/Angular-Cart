import { TestBed } from "@angular/core/testing";
import {
  NgbModal,
  NgbModalModule,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";

import { ErrorService } from "./error.service";

class NgbModalStub {
  open() {}
}

describe("ErrorService", () => {
  let service: ErrorService;
  let modalService: NgbModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgbModalModule],
    });

    service = TestBed.inject(ErrorService);
    modalService = TestBed.inject(NgbModal);
  });

  it("should open a modal with the error message", () => {
    const spy = spyOn(modalService, "open").and.returnValue({
      componentInstance: {},
    } as NgbModalRef);

    service.open({ message: "Error message" } as Error);

    expect(spy).toHaveBeenCalled();
  });
});
