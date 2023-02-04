import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, Subject, takeUntil } from "rxjs";
import { ProductService } from "~core/services";
import { IProduct } from "~shared/interfaces";

enum Mode {
  CREATE,
  EDIT,
}
@Component({
  selector: "app-products-editor-page",
  templateUrl: "./products-editor-page.component.html",
  styleUrls: ["./products-editor-page.component.scss"],
})
export class ProductsEditorPage {
  isComponentDestroyed$ = new Subject<boolean>();
  isLoading$ = new BehaviorSubject<boolean>(false);
  mode!: Mode;
  product!: IProduct;
  form!: FormGroup;

  constructor(
    private router: Router,
    private currentRoute: ActivatedRoute,
    private productService: ProductService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.currentRoute.params
      .pipe(takeUntil(this.isComponentDestroyed$))
      .subscribe((params) => {
        const id = params["id"];

        this.mode = !id || id === "add" ? Mode.CREATE : Mode.EDIT;

        if (this.mode === Mode.EDIT) {
          this.isLoading$.next(true);
          this.productService
            .get(Number(id))
            .pipe(takeUntil(this.isComponentDestroyed$))
            .subscribe(({ data: product }) => {
              this.product = product;
              this.initForm();
              this.isLoading$.next(false);
            });
        } else {
          this.initForm();
        }
      });
  }

  ngOnDestroy() {
    this.isComponentDestroyed$.next(true);
    this.isComponentDestroyed$.complete();
  }

  initForm() {
    this.form = this.formBuilder.group({
      title: this.formBuilder.control(this.product?.title, [
        Validators.required,
      ]),
      category: this.formBuilder.control(this.product?.category, [
        Validators.required,
      ]),
      description: this.formBuilder.control(this.product?.description, [
        Validators.required,
      ]),
      imageUrl: this.formBuilder.control(this.product?.imageUrl, []),
      unitPrice: this.formBuilder.control(this.product?.unitPrice, [
        Validators.required,
        Validators.min(0),
      ]),
    });
  }

  saveProduct() {
    if (this.form.valid) {
      if (this.mode === Mode.CREATE) {
        this.productService.create(this.form.value).subscribe(() => {
          this.router.navigate(["admin", "products"]);
        });
      } else {
        this.productService
          .update({ ...this.product, ...this.form.value })
          .subscribe(() => {
            this.router.navigate(["admin", "products"]);
          });
      }
    }
  }
}
