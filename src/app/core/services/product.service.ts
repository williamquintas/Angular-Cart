import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import {
  IApiDataResponse,
  IApiListResponse,
  IApiService,
  IProduct,
  IProductQueryParameters,
} from "~shared/interfaces";

@Injectable({
  providedIn: "root",
})
export class ProductService implements IApiService<IProduct> {
  constructor(private httpClient: HttpClient) {}

  getAll = (
    parameters: IProductQueryParameters
  ): Observable<IApiListResponse<IProduct>> => {
    const { category, page, pageSize, order, search, sort } = parameters;
    return this.httpClient
      .get<IProduct[]>("/products", {
        params: {
          ...(page ? { _page: page } : {}),
          ...(pageSize ? { _limit: pageSize } : {}),
          ...(search ? { title_like: search } : {}),
          ...(category ? { category } : {}),
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

  get = (id: number): Observable<IApiDataResponse<IProduct>> => {
    return this.httpClient
      .get<IProduct>(`/products/${id}`)
      .pipe(map((data) => ({ data })));
  };

  create = (data: IProduct): Observable<void> => {
    return this.httpClient
      .post<IProduct>("/products", data)
      .pipe(map(() => undefined));
  };

  update = (data: IProduct): Observable<void> => {
    return this.httpClient
      .put<IProduct>(`/products/${data.id}`, data)
      .pipe(map(() => undefined));
  };

  delete = (id: number): Observable<void> => {
    return this.httpClient
      .delete<IProduct>(`/products/${id}`)
      .pipe(map(() => undefined));
  };
}
