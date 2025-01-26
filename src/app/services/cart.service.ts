import { Injectable, signal } from '@angular/core';
import { Product } from '../models/products.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = signal<Product[]>([]);

  addToCart(product: Product, quantity: number) {
    let index = this.cart().findIndex(item => item.id == product.id);
    if(index < 0) {
      product.quantity = quantity;
      this.cart.set([...this.cart(), product]);
    } else {
      let item = this.cart().at(index);
      item!.quantity! += quantity;
    }
  }

  removeItem(product: Product) {
    this.cart.set(this.cart().filter(item => item.id != product.id));
  }

  getSubtotals() {
    return this.cart().map(product => product.price * product.quantity!);
  }

  constructor() { }
}
