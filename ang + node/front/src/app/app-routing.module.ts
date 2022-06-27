import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  { path: "", redirectTo: "/products", pathMatch: 'full' },
  { path: "products", component: ProductListComponent },
  { path: "product/detail/:id", component:ProductDetailComponent },
  { path: "product/update/:id", component:ProductEditComponent },
  { path: "product/add", component: ProductAddComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
