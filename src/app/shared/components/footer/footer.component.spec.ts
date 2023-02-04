import { ComponentFixture, TestBed } from "@angular/core/testing";
import storeConfig from "~shared/data/config.json";

import { FooterComponent } from "./footer.component";

describe("FooterComponent", () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should have the correct text", () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("span").textContent).toContain(
      "Powered by Angular, Made by William Melo. "
    );
  });

  it("should have the correct copyright", () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("#copyright").textContent).toContain(
      `${storeConfig.name} © ${new Date().getFullYear()}`
    );
  });
});
