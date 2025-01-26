import { Component, computed, inject, input } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { PrimaryButtonComponent } from "../../../components/primary-button/primary-button.component";
import { Product } from '../../../models/products.model';

@Component({
  selector: 'app-order-summary',
  imports: [PrimaryButtonComponent],
  template: `
    <div class="bg-slate-100 p-6 rounded-xl shadow-xl border">
      <h2 class="text-2xl">Order Summary</h2>
      <div class="flex flex-col gap-4">
        <div class="flex gap-4 mt-2">
          <span class="text-lg">Total</span>
          <span class="font-bold">{{ '$' + total() }}</span>
        </div>
        <app-primary-button label="Proceed to checkout" />
      </div>
    </div>
  `,
  styles: ``
})
export class OrderSummaryComponent {

  total = input.required<number>();

}
