import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductCartList } from './product-cart-list/product-cart-list';
import { YourCart } from './your-cart/your-cart';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductCartList, YourCart],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('product-list-with-cart');
}
