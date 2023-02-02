import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { IUser, UserRole } from "~shared/interfaces";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private user: IUser | null = null;
  private user$ = new BehaviorSubject<IUser | null>(this.user);

  constructor(private httpClient: HttpClient) {}

  login(credentials: {
    username: string;
    password: string;
  }): Observable<boolean> {
    return this.httpClient
      .post<IUser>("/auth/login", credentials, {
        responseType: "json",
        headers: { "Content-Type": "application/json" },
      })
      .pipe(
        map((user: IUser) => {
          const { token, ...params } = user;
          if (!user || !token) {
            return false;
          } else {
            this.user = { ...params, role: UserRole.COMMON };
            localStorage.setItem("token", token);

            this.user$.next(this.user);
            return true;
          }
        })
      );
  }

  logout() {
    this.user = null;
    localStorage.removeItem("token");
    this.user$.next(this.user);
  }

  getUser() {
    return this.user$;
  }

  get isLoggedIn() {
    return !!this.user;
  }
}
