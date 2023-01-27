import { Injectable } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ErrorModalComponent } from "../../shared/components/error-modal/error-modal.component";

@Injectable({
  providedIn: "root",
})
export class ErrorService {
  constructor(private modalService: NgbModal) {}

  open(err: Error & { error?: { message?: string } }): void {
    const { name, message, error } = err;
    const modalReference = this.modalService.open(ErrorModalComponent);
    const { componentInstance } = modalReference;
    componentInstance.title = name;
    componentInstance.message = error?.message ?? message;
    console.error(err);
  }
}
