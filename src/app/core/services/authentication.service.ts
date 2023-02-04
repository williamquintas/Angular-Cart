import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, of, switchMap } from "rxjs";
import { IUser, UserRole } from "~shared/interfaces";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private user: IUser | null = null;
  private user$ = new BehaviorSubject<IUser | null>(this.user);

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {}

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
        switchMap((authenticatedUser: IUser) =>
          authenticatedUser?.token
            ? this.userService.getOne(authenticatedUser.id).pipe(
                map(({ data: foundUser }) => {
                  this.user = {
                    ...authenticatedUser,
                    ...foundUser,
                    role: UserRole.COMMON,
                  };
                  localStorage.setItem("token", authenticatedUser.token ?? "");
                  this.user$.next(this.user);
                  return true;
                })
              )
            : of(false)
        )
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
