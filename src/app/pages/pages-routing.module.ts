import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "cart",
    loadChildren: () =>
      import("./cart/cart.module").then((module) => module.CartModule),
  },
  {
    path: "products",
    loadChildren: () =>
      import("./products/products.module").then(
        (module) => module.ProductsModule
      ),
  },
  {
    path: "user",
    loadChildren: () =>
      import("./user/user.module").then((module) => module.UserModule),
  },
  { path: "", redirectTo: "products", pathMatch: "full" },
  {
    path: "**",
    redirectTo: "products",
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
