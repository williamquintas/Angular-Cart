import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { map, Observable, of } from "rxjs";
import { ProductService } from "~core/services";
import { IProduct } from "../../shared/interfaces";

@Injectable({
  providedIn: "root",
})
export class ProductDetailsResolver implements Resolve<IProduct | null> {
  constructor(private productService: ProductService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<IProduct | null> {
    const { id } = route.params;

    if (!id) {
      return of(null);
    } else {
      return this.productService
        .get(Number(id))
        .pipe(map((response) => response.data));
    }
  }
}
