import { ComponentFixture, TestBed } from "@angular/core/testing";

import { UsersListPage } from "./users-list-page.component";

describe("UsersListPage", () => {
  let component: UsersListPage;
  let fixture: ComponentFixture<UsersListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersListPage],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit("should create", () => {
    expect(component).toBeTruthy();
  });
});
