import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { FooterComponent } from "~shared/components/footer/footer.component";
import { HeaderComponent } from "~shared/components/header/header.component";

@NgModule({
  declarations: [FooterComponent, HeaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  exports: [FooterComponent, HeaderComponent],
})
export class SharedModule {}
