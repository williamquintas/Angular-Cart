import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, of, switchMap } from "rxjs";
import { IUser, UserRole } from "../../shared/interfaces";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  private admin: IUser | null = null;
  private admin$ = new BehaviorSubject<IUser | null>(this.admin);

  constructor(private httpClient: HttpClient) {}

  private searchForAdmin = (
    username: string,
    password: string
  ): Observable<boolean> =>
    this.httpClient
      .get("/admins", { params: { username, password } })
      .pipe(map((admin) => !!admin));

  login(credentials: {
    username: string;
    password: string;
  }): Observable<boolean> {
    const { username, password } = credentials;

    return this.searchForAdmin(username, password).pipe(
      switchMap((isAdmin) =>
        isAdmin
          ? this.httpClient
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
                    this.admin = { ...params, role: UserRole.ADMIN };
                    localStorage.setItem("token", token);

                    this.admin$.next(this.admin);
                    return true;
                  }
                })
              )
          : of(false)
      )
    );
  }

  logout() {
    this.admin = null;
    localStorage.removeItem("token");
    this.admin$.next(this.admin);
  }

  getAdmin() {
    return this.admin$;
  }

  get isLoggedIn() {
    return !!this.admin;
  }
}
