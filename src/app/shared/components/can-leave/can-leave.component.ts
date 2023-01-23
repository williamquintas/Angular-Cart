import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-can-leave",
  templateUrl: "./can-leave.component.html",
  styleUrls: ["./can-leave.component.scss"],
})
export class CanLeaveModal {
  constructor(private modal: NgbActiveModal) {}

  close(value: boolean) {
    this.modal.close(value);
  }
}
