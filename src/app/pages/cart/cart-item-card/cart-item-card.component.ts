import { Component, computed, EventEmitter, inject, input, output, signal } from '@angular/core';
import { Product } from '../../../models/products.model';
import { PrimaryButtonComponent } from "../../../components/primary-button/primary-button.component";
import { CartService } from '../../../services/cart.service';
import { ButtonComponent } from "../../../components/button/button.component";

@Component({
  selector: 'app-cart-item-card',
  imports: [ButtonComponent, PrimaryButtonComponent],
  template: `
    <div class="bg-white shadow-md border rounded-xl p-6 flex items-center mt-4">
        <img [src]="product().image" class="w-[50px] h-[50px] object-contain">
        <div class="flex flex-col ms-3">
          <span class="font-bold">{{ product().title }}</span>
          <span class="text-sm">{{ '$' + subtotal() }}</span>
          <div class="flex items-center">
            <app-primary-button label="-" [disabled]="product().quantity === 0 ? true : false" (btnClicked)="decrement()" />
            <span class="text-lg px-4"> {{ product().quantity }} </span>
            <app-primary-button label="+" (btnClicked)="increment()" [disabled]="(product().quantity! >= product().stock!) ? true : false" />
          </div>
        </div>
      <div class="flex-1"></div>
      <app-button label="Remove" (btnClicked)="cartService.removeItem(product())" />
    </div>
  `,
  styles: ``
})
export class CartItemCardComponent {

  product = input.required<Product>();
  quantity = input.required<number>();
  quantityChanged = output<Product>();
  cartService = inject(CartService);

  subtotal = computed(() => {
    return this.quantity() * this.product().price;
  });

  increment() {
    this.product().quantity!++;
    this.onQuantityChanged();
  }

  decrement() {
    this.product().quantity!--;
    if(this.product().quantity === 0) {
      console.log('zero');
      
      this.cartService.removeItem(this.product());
    }
    this.onQuantityChanged();
  }

  onQuantityChanged() {
    this.quantityChanged.emit(this.product());
  }
}
