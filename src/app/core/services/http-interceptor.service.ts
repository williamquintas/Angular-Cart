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
    return next.handle(
      request.clone({ url: `${config.serverURL}${request.url}` })
    );
  }
}
