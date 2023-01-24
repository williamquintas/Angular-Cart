import { Component } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { ProductsService } from "~services/products.service";
import { IProduct } from "~shared/models/IProduct";

@Component({
  selector: "app-products-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ProductsListComponent {
  isComponentDestroyed$ = new Subject<boolean>();
  list: IProduct[] = [];

  constructor(private service: ProductsService) {}

  ngOnInit() {
    this.service
      .getProducts()
      .pipe(takeUntil(this.isComponentDestroyed$))
      .subscribe((products) => {
        this.list = products;
      });
  }

  ngOnDestroy() {
    this.isComponentDestroyed$.next(true);
    this.isComponentDestroyed$.complete();
  }
}
