import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductService, Product } from '../product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit {
  detailForm!: FormGroup;
  id!: number;
  productDetails!: Product;
  constructor(private product: ProductService,private router: Router, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = parseFloat(params['id']);
      this.productDetails = this.product.getProductById(this.id);
      if (!this.productDetails) {
        this.router.navigate(['/products/1']);
      } else {
        this.detailForm = this.fb.group({
          nameControl: new FormControl(this.productDetails.name, [Validators.required, Validators.maxLength(30)]),
          descControl: new FormControl(this.productDetails.description, [Validators.maxLength(200)]),
          priceControl: new FormControl(this.productDetails.price, [Validators.required, Validators.pattern(/\d+/), Validators.min(0)])
        });  
      }
    });
  }

  editProduct() {
    const newProduct: Product = {
      id: this.productDetails.id,
      creation_date: this.productDetails.creation_date,
      image_addr: this.productDetails.image_addr, // no change from static details
      name: this.detailForm.value.nameControl,
      description: this.detailForm.value.descControl,
      price: this.detailForm.value.priceControl,
    };
    this.product.editProductById(newProduct);
  }

}
