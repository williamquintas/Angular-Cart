import { Component, Input } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { debounceTime, Subject, takeUntil } from "rxjs";
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
  @Input() category!: string;

  isComponentDestroyed$ = new Subject<boolean>();
  list: IProduct[] = [];
  totalCount = 0;

  PageSizeOptions = PageSizeOptions;
  parameters: IQueryParameters = {
    page: 1,
    pageSize: PageSizeOptions[0],
  };

  hasInputChanged$ = new Subject<void>();
  form = new FormGroup({
    search: new FormControl("", []),
  });

  constructor(
    private productService: ProductService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.loadProducts();

    this.hasInputChanged$
      .pipe(debounceTime(300), takeUntil(this.isComponentDestroyed$))
      .subscribe({ next: () => this.loadProducts() });
  }

  ngOnChanges(changes: { category: string }) {
    if (changes.category) {
      this.loadProducts();
    }
  }

  ngOnDestroy() {
    this.isComponentDestroyed$.next(true);
    this.isComponentDestroyed$.complete();
  }

  loadProducts() {
    const searchInput = this.form.get("search")?.value ?? undefined;
    const parameters = {
      ...this.parameters,
      search: searchInput,
      ...(this.category ? { category: this.category } : {}),
    };

    this.productService
      .getAll(parameters)
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
    this.loadProducts();
  }

  onFormChange() {
    this.hasInputChanged$.next();
  }
}
