import { Component, inject, input, signal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { OrderSummaryComponent } from "./order-summary/order-summary.component";
import { Product } from '../../models/products.model';
import { CartItemCardComponent } from "./cart-item-card/cart-item-card.component";

@Component({
  selector: 'app-cart',
  imports: [OrderSummaryComponent, CartItemCardComponent],
  template: `
  <div class="p-6 flex flex-col gap-4">
    <h1 class="text-2xl">Shopping Cart</h1>
    <div class="grid grid-cols-1">
      @for (item of cartService.cart(); track item.id) {
        <app-cart-item-card [product]="item" [quantity]="item.quantity!" (quantityChanged)="onQuantityChanged($event)" />
      }
    </div>
    <app-order-summary [total]="total()" />
  </div>
  `,
  styles: ``
})
export class CartComponent {
  cartService = inject(CartService);
  total = signal<number>(this.calculateTotal());

  calculateTotal(): number {
    return this.cartService.cart().reduce((acc, product) => acc + (product.price * product.quantity!), 0);
  }

  onQuantityChanged(updatedProduct: Product) {
    const updatedProducts = this.cartService.cart().map(product =>
      product.id === updatedProduct.id ? { ...product, quantity: updatedProduct.quantity } : product
    );
    this.cartService.cart.set(updatedProducts);
    this.total.set(this.calculateTotal());
  }
  
}