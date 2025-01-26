import { Component, signal } from '@angular/core';
import { Product } from '../../models/products.model';
import { ProductCardComponent } from "./product-card/product-card.component";

@Component({
  selector: 'app-products-list',
  imports: [ProductCardComponent],
  template: `
    <div class="grid">
      <div class="justify-self-end mr-4 mt-3 max-w-sm min-w-[125px]">      
        <div class="relative">
          <select
              class="w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded-lg pl-3 py-2 transition duration-300 ease focus:outline-none hover:border-slate-400 shadow-md focus:shadow-md cursor-pointer" (change)="onCategoryChange($event)">
              <option value="">Category</option>
              
              @for (category of categories(); track $index) {
                <option [value]="category"> {{ category }} </option>
              }

          </select>
        </div>
      </div>
    </div>
    <div class="p-8 grid grid-cols-2 gap-4">
      @for (product of products(); track product.id) {
        <div> <app-product-card [product]="product" /> </div>
      }
    </div>
  `,
  styles: ``
})
export class ProductsListComponent {

  async ngOnInit() {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    this.products.set(data);
    const categoryRes = await fetch('https://fakestoreapi.com/products/categories');
    const categoryData = await categoryRes.json();
    this.categories.set(categoryData);
    
  }

  categories = signal<String[]>([]);
  products = signal<Product[]>([]);

  async onCategoryChange(event: Event) {
    var category = (event.target as HTMLSelectElement).value;
    const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    const data = await res.json();
    this.products.set(data);
  }
}
