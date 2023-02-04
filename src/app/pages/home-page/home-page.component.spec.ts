import { ComponentFixture, TestBed } from "@angular/core/testing";
import storeConfig from "~shared/data/config.json";
import { HomePage } from "./home-page.component";

describe("HomePageComponent", () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should have the correct text", () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("h1").textContent).toContain(
      `Welcome to ${storeConfig.name}!`
    );
  });
});
