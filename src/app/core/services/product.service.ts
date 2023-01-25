import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import {
  IApiListResponse,
  IApiService,
  IProduct,
  IQueryParameters,
} from "~shared/interfaces";

@Injectable({
  providedIn: "root",
})
export class ProductService implements IApiService<IProduct> {
  constructor(private httpClient: HttpClient) {}

  getAll = (
    parameters: IQueryParameters
  ): Observable<IApiListResponse<IProduct>> => {
    const { page, pageSize, order, search, sort } = parameters;
    return this.httpClient
      .get<IProduct[]>("/products", {
        params: {
          _page: page,
          _limit: pageSize,
          ...(search ? { _q: search } : {}),
          ...(sort ? { _sort: sort } : {}),
          ...(order ? { _order: order } : {}),
        },
        observe: "response",
      })
      .pipe(
        map(
          (res: HttpResponse<IProduct[]>) =>
            ({
              data: res.body ?? [],
              totalCount: res.headers.get("X-Total-Count") ?? 0,
            } as IApiListResponse<IProduct>)
        )
      );
  };
}
