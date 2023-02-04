import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { IApiDataResponse, IApiService, IUser } from "../../shared/interfaces";

@Injectable({
  providedIn: "root",
})
export class UserService implements IApiService<IUser> {
  constructor(private httpClient: HttpClient) {}

  getOne(id: string | number): Observable<IApiDataResponse<IUser>> {
    return this.httpClient
      .get<IUser>(`/users/${id}`, { observe: "response" })
      .pipe(
        map(
          (res: HttpResponse<IUser>) =>
            ({ data: res.body } as IApiDataResponse<IUser>)
        )
      );
  }

  create(user: IUser): Observable<void> {
    return this.httpClient
      .post<IUser>("/users", user)
      .pipe(map((response) => undefined));
  }

  update(user: IUser): Observable<void> {
    return this.httpClient
      .put<IUser>(`/users/${user.id}`, user)
      .pipe(map((response) => undefined));
  }
}
