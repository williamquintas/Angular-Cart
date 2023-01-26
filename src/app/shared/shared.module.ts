import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { CanLeaveModal } from "~shared/components/can-leave/can-leave.component";
import { FooterComponent } from "~shared/components/footer/footer.component";
import { HeaderComponent } from "~shared/components/header/header.component";
import { ToastComponent } from "~shared/components/toast/toast.component";
import { ErrorModalComponent } from './components/error-modal/error-modal.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    ToastComponent,
    CanLeaveModal,
    ErrorModalComponent,
  ],
  imports: [CommonModule, RouterModule, NgbModule],
  exports: [FooterComponent, HeaderComponent, ToastComponent],
})
export class SharedModule {}
