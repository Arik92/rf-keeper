import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductAddComponent } from './product-add/product-add.component';

const routes: Routes = [
  { path: '', redirectTo: '/products/1', pathMatch: 'full' },
  { path: 'products/:id', component: ProductDetailsComponent},
  { path: 'add', component: ProductAddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
