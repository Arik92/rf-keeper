import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { ProductService, Product } from '../product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  detailForm!: FormGroup;
  id: number = -1;
  productDetails!: Product;
  constructor(private product: ProductService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.detailForm = this.fb.group({
      nameControl: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      descControl: new FormControl('', [Validators.maxLength(200)]),
      priceControl: new FormControl(0, [Validators.required, Validators.pattern(/\d+/), Validators.min(0)])
    });  
  }

  addProduct() {
    const newProduct: Product = {
      id: this.product.generateId(),
      creation_date: Date.now(),
      image_addr: 'assets/mock05.png', // static for now
      name: this.detailForm.value.nameControl,
      description: this.detailForm.value.descControl,
      price: this.detailForm.value.priceControl,
    };
    this.product.addProduct(newProduct);
  }

}
