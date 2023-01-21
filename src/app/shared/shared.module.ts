import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterModule } from "@angular/router";
import {
  NgbCollapseModule,
  NgbTooltipModule,
} from "@ng-bootstrap/ng-bootstrap";

import { CartComponent } from "~shared/components/cart/cart.component";
import { FooterComponent } from "~shared/components/footer/footer.component";
import { HeaderComponent } from "~shared/components/header/header.component";

@NgModule({
  declarations: [CartComponent, FooterComponent, HeaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTooltipModule,
    ReactiveFormsModule,
    NgbCollapseModule,
    NgbTooltipModule,
    RouterModule,
  ],
  exports: [CartComponent, FooterComponent, HeaderComponent],
})
export class SharedModule {}
