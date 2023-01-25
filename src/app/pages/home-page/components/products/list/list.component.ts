import { Component } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { ProductService } from "~core/services";
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

  constructor(private service: ProductService) {}

  ngOnInit() {
    this.loadPrograms();
  }

  ngOnDestroy() {
    this.isComponentDestroyed$.next(true);
    this.isComponentDestroyed$.complete();
  }

  loadPrograms() {
    this.service
      .getAll(this.parameters)
      .pipe(takeUntil(this.isComponentDestroyed$))
      .subscribe(({ data, totalCount }) => {
        this.list = data;
        this.totalCount = totalCount;
      });
  }

  onPageChange(page: number) {
    this.parameters = { ...this.parameters, page };
    this.loadPrograms();
  }
}
