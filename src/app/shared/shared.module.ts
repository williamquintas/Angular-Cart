import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { CanLeaveModal } from "~shared/components/can-leave/can-leave.component";
import { FooterComponent } from "~shared/components/footer/footer.component";
import { HeaderComponent } from "~shared/components/header/header.component";
import { ToastComponent } from "~shared/components/toast/toast.component";

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    ToastComponent,
    CanLeaveModal,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  exports: [FooterComponent, HeaderComponent, ToastComponent],
})
export class SharedModule {}
