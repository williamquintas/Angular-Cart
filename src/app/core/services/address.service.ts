import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AddressService {
  constructor(private httpClient: HttpClient) {}

  getAddressByZipCode(zipCode: string): Observable<{ [key: string]: string }> {
    return this.httpClient
      .get<{ [key: string]: string }>(`/ws/${zipCode}/json`)
      .pipe(
        map((response) => response),
        catchError((error) => throwError(() => new Error(error)))
      );
  }
}
