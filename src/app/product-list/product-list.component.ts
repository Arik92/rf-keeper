import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService, Product } from '../product.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productDisplay: Product[] = [];

  constructor(private products: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.products.productSubscription.subscribe(newProducts => {
      this.productDisplay = newProducts;
    })
  }

  selectProduct(productId: number): void {
    this.router.navigate(['/products/'+productId]);
  }
  sortByDate() {
    this.products.sortByDate();
  }
  sortByName() {
    this.products.sortByName();
  }

  newProduct() {
    this.router.navigate(['/add']);
  }

}
