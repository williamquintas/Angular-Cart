import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { CartService, ErrorService, ToastService } from "~core/services";
import { IProduct } from "~shared/interfaces";

@Component({
  selector: "app-product-details-page",
  templateUrl: "./details-page.component.html",
  styleUrls: ["./details-page.component.scss"],
})
export class DetailsPage {
  product!: IProduct;
  isComponentDestroyed$ = new BehaviorSubject<boolean>(false);
  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private errorService: ErrorService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.route.data.subscribe({
      next: ({ product }) => (this.product = product),
      error: (error) => this.errorService.open(error),
    });
  }

  ngOnDestroy() {
    this.isComponentDestroyed$.next(true);
    this.isComponentDestroyed$.complete();
  }

  updateQuantity(newQuantity: number) {
    this.quantity = newQuantity;
  }

  addToCart(): void {
    const cartItem = { ...this.product, quantity: this.quantity };
    this.cartService.add(cartItem);
    this.toastService.show({ body: "Product added to cart!" });
  }
}
