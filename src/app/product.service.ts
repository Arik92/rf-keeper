import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Product {
  id: number,
  name: string,
  description: string,
  price: number,
  creation_date: number, // date as ms
  image_addr: string
};

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  productList: Product[] = [
    {
      id: 1,
      name: 'TV set',
      description: 'screen display, 4K',
      price: 5000,
      creation_date: Date.now(),
      image_addr: 'assets/mock05.png'
    },
    {
      id: 2,
      name: 'Headphones',
      description: 'Best headphones',
      price: 3000,
      creation_date: Date.now(),
      image_addr: 'assets/mock05.png'
    },
    {
      id: 3,
      name: 'PS5',
      description: 'best in the market',
      price: 9999,
      creation_date: Date.now(),
      image_addr: 'assets/mock05.png'
    },
    {
      id: 4,
      name: 'product 4',
      description: '',
      price: 0,
      creation_date: Date.now(),
      image_addr: 'assets/mock05.png'
    },
    {
      id: 5,
      name: 'product 5',
      description: '',
      price: 0,
      creation_date: Date.now(),
      image_addr: 'assets/mock05.png'
    },
    {
      id: 6,
      name: 'product 6',
      description: '',
      price: 0,
      creation_date: Date.now(),
      image_addr: 'assets/mock05.png'
    },
    {
      id: 7,
      name: 'product 7',
      description: '',
      price: 0,
      creation_date: Date.now(),
      image_addr: 'assets/mock05.png'
    },
    {
      id: 8,
      name: 'product 8',
      description: '',
      price: 0,
      creation_date: Date.now(),
      image_addr: 'assets/mock05.png'
    },
    {
      id: 9,
      name: 'product 9',
      description: '',
      price: 0,
      creation_date: Date.now(),
      image_addr: 'assets/mock05.png'
    },
    {
      id: 10,
      name: 'product 10',
      description: '',
      price: 0,
      creation_date: Date.now(),
      image_addr: 'assets/mock05.png'
    }
  ];
  productSubscription: BehaviorSubject<Product[]> = new BehaviorSubject(this.productList);

  constructor() {
  }

  getProductById(id: number): Product {
    const foundProduct = this.productList.filter(product => product.id === id)[0];
    return foundProduct;
  }

  editProductById(product: Product): void {
    for (let i = 0; i < this.productList.length; i++) {
      if (this.productList[i].id === product.id) {
        this.productList[i] = product; // update by override
        console.log('updated ', this.productList[i]);
      }
    }
    this.productSubscription.next(this.productList);
  }
  removeProductById(id: number): void {
    for (let i = 0; i < this.productList.length; i++) {
      if (id === this.productList[i].id) {
        this.productList.splice(i, 1);
      }
    }
    this.productSubscription.next(this.productList);
  }

  addProduct(newProduct: Product): void {
    this.productList.push(newProduct);
    this.productSubscription.next(this.productList);
  }
  doesProductIdExist(id: number): boolean {
    for (let i = 0; i < this.productList.length; i++) {
      if (id === this.productList[i].id) {
        return true;
      }
    }
    return false;
  }
  generateId(): number {
    let randomId = Math.floor(Math.random() * 10000); // initial limit of 10000 values
    while (this.doesProductIdExist(randomId)) {
      randomId = Math.floor(Math.random() * 10000);
    }
    return randomId;
  }

  sortByDate() {
    this.productList = this.productList.sort((product1, product2) => {
      return product1.creation_date - product2.creation_date;
    });
    this.productSubscription.next(this.productList);
  }
  sortByName() {
    this.productList = this.productList.sort((product1, product2) => {
      const name1 = product1.name.toUpperCase(); // ignore upper and lowercase
      const name2 = product2.name.toUpperCase(); // ignore upper and lowercase
      if (name1 < name2) {
        return -1;
      } else if (name1 > name2) {
        return 1;
      } else {
        return 0; // names are equal
      }
    });
    this.productSubscription.next(this.productList);
  }
}
