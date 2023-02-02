import { Observable } from "rxjs";

export interface IQueryParameters {
  page: number;
  pageSize: typeof PageSizeOptions[number];
  sort?: string;
  order?: Order;
  search?: string;
}

export const PageSizeOptions = <const>[6, 12, 24, 48, 100];

export enum Order {
  ASC = "asc",
  DESC = "desc",
}

export interface IApiListResponse<T> {
  data: T[];
  totalCount: number;
}

export interface IApiDataResponse<T> {
  data: T;
}

export interface IApiService<T> {
  getOne?(id: string | number): Observable<IApiDataResponse<T>>;
  getAll?(parameters: IQueryParameters): Observable<IApiListResponse<T>>;
  create?(body: T): Observable<void>;
  update?(body: T): Observable<void>;
  delete?(id: string | number): Observable<void>;
}
