import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IUser, UserRole } from "~shared/interfaces";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private user: IUser | null = null;
  private user$ = new BehaviorSubject<IUser | null>(this.user);

  constructor() {}

  login() {
    this.user = {
      id: 1,
      name: "John Doe",
      role: UserRole.ADMIN,
    };

    this.user$.next(this.user);
  }

  logout() {
    this.user = null;
    this.user$.next(this.user);
  }

  getUser() {
    return this.user$;
  }

  get isLoggedIn() {
    return !!this.user;
  }
}
