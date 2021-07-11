import { Component, Input, OnInit } from '@angular/core';
import { ProductService, Product } from '../product.service';
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;

  constructor(private products: ProductService) {    
   }

  ngOnInit(): void {
  }

  delete(id:number) {
    this.products.removeProductById(id);
  }

}
