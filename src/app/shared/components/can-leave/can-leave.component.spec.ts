import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { CanLeaveModal } from "./can-leave.component";

describe("CanLeaveModal", () => {
  let component: CanLeaveModal;
  let fixture: ComponentFixture<CanLeaveModal>;
  let activeModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CanLeaveModal],
      providers: [NgbActiveModal],
    });

    fixture = TestBed.createComponent(CanLeaveModal);
    component = fixture.componentInstance;
    activeModal = TestBed.get(NgbActiveModal);
  });

  it("should close the modal when the close() method is called", () => {
    spyOn(activeModal, "close");
    component.close(true);
    expect(activeModal.close).toHaveBeenCalled();
  });
});
