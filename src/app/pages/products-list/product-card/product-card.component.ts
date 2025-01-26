import { Component, inject, input } from '@angular/core';
import { Product } from '../../../models/products.model';
import { PrimaryButtonComponent } from "../../../components/primary-button/primary-button.component";
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [PrimaryButtonComponent],
  template: `
    <div class="bg-white shadow-md border rounded-xl p-6 flex flex-col gap-6 relative">
      <div class="mx-auto">
        <img [src]="product().image" class="w-[200px] h-[100px] object-contain mx-auto">
        <div class="flex flex-col mt-2">
          <span class="text-md font-bold">{{ product().title }}</span>
          <span class="text-md font-bold"> {{product().category}} </span>
          <span class="text-sm">{{ '$' + product().price }}</span>
          <div class="flex items-center justify-center">
            <app-primary-button label="-" [disabled]="quantity == 0 ? true : false" (btnClicked)="decrement()" />
            <span class="text-lg px-4"> {{ quantity }} </span>
            <app-primary-button label="+" (btnClicked)="increment()" [disabled]="(quantity! >= product().stock!) ? true : false" />
          </div>
          <app-primary-button [label]="'Add to Cart'" class="mt-3" [disabled]="quantity == 0 ? true : false" (btnClicked)="cartService.addToCart(product(), quantity)" />
        </div>
        
        <span class="absolute top-2 right-3 text-sm font-bold" [class]="product().stock ? 'text-green-500' : 'text-red-500'">
          @if (product().stock) {
            {{ product().stock }} left } @else { Out of stock }
        </span>
      </div>
    </div>
  `,
  styles: ``
})
export class ProductCardComponent {

  product = input.required<Product>();
  quantity = 0;
  cartService = inject(CartService);

  increment() {
    this.quantity++;
  }

  decrement() {
    this.quantity!--;
  }

  ngOnInit(): void {
    if(this.product().quantity == null) {
      this.product().quantity = 0;
    }
  }
}
