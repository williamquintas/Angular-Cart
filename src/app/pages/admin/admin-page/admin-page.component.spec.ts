import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AdminPage } from "./admin-page.component";

describe("AdminPageComponent", () => {
  let component: AdminPage;
  let fixture: ComponentFixture<AdminPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminPage],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit("should create", () => {
    expect(component).toBeTruthy();
  });
});
