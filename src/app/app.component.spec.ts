import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";

import { CoreModule } from "~core/core.module";
import { PagesModule } from "~pages/pages.module";
import { SharedModule } from "~shared/shared.module";

describe("AppComponent", () => {
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, CoreModule, PagesModule, SharedModule],
      declarations: [AppComponent],
    }).compileComponents();
  });

  xit("should be created", () => {
    expect(component).toBeTruthy();
  });
});
