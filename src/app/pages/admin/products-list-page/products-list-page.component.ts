import { Component } from "@angular/core";
import { BehaviorSubject, first, Subject, takeUntil } from "rxjs";
import { ErrorService, ProductService } from "../../../core/services";
import { IProduct } from "../../../shared/interfaces";

@Component({
  selector: "app-products-list-page",
  templateUrl: "./products-list-page.component.html",
  styleUrls: ["./products-list-page.component.scss"],
})
export class ProductsListPage {
  isComponentDestroyed$ = new Subject<boolean>();
  isLoading$ = new BehaviorSubject<boolean>(false);
  productIdBeingDeleted$ = new Subject<number | null>();

  productsList: IProduct[] = [];

  constructor(
    private productService: ProductService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.getAll();
  }

  ngOnDestroy() {
    this.isComponentDestroyed$.next(true);
    this.isComponentDestroyed$.complete();
  }

  getAll(): void {
    this.isLoading$.next(true);
    this.productService
      .getAll({})
      .pipe(takeUntil(this.isComponentDestroyed$))
      .subscribe({
        next: ({ data }) => {
          this.productsList = data;
        },
        error: (error) => {
          this.errorService.open(error);
        },
        complete: () => this.isLoading$.next(false),
      });
  }

  deleteProduct(id: number): void {
    this.productIdBeingDeleted$.next(id);
    this.productService
      .delete(id)
      .pipe(first())
      .subscribe({
        next: () => {
          this.productsList = this.productsList.filter((p) => p.id !== id);
        },
        complete: () => this.productIdBeingDeleted$.next(null),
      });
  }
}
