import { Component } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { ErrorService, ProductService } from "~core/services";
import {
  IProduct,
  IQueryParameters,
  PageSizeOptions,
} from "~shared/interfaces";

@Component({
  selector: "app-products-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ProductsListComponent {
  isComponentDestroyed$ = new Subject<boolean>();
  list: IProduct[] = [];
  totalCount = 0;
  PageSizeOptions = PageSizeOptions;
  parameters: IQueryParameters = {
    page: 1,
    pageSize: PageSizeOptions[0],
  };

  constructor(
    private productService: ProductService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.loadPrograms();
  }

  ngOnDestroy() {
    this.isComponentDestroyed$.next(true);
    this.isComponentDestroyed$.complete();
  }

  loadPrograms() {
    this.productService
      .getAll(this.parameters)
      .pipe(takeUntil(this.isComponentDestroyed$))
      .subscribe({
        next: ({ data, totalCount }) => {
          this.list = data;
          this.totalCount = totalCount;
        },
        error: (err: Error) => {
          this.errorService.open({ ...err, name: err.name ?? "Error" });
        },
      });
  }

  onPageChange(page: number) {
    this.parameters = { ...this.parameters, page };
    this.loadPrograms();
  }
}
