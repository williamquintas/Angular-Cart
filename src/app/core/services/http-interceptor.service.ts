import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import config from "~shared/data/config.json";

@Injectable({
  providedIn: "root",
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { authenticationURL, serverURL, viacepURL } = config;
    const token = localStorage.getItem("token");

    return next.handle(
      request.clone({
        url: `${
          request.url.startsWith("/auth/login")
            ? authenticationURL
            : request.url.startsWith("/ws")
            ? viacepURL
            : serverURL
        }${request.url}`,
        setHeaders: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      })
    );
  }
}
