import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { RemoveFromCart } from '../remove-from-cart';

@Component({
  selector: 'app-products-order',
  imports: [CurrencyPipe],
  templateUrl: './products-order.html',
  styleUrl: './products-order.scss',
})
export class ProductsOrder {
  @Input()
  cartItem: any = [];

  @Input()
  orderOverallPrice: number = 0;

  @Input()
  isOpen = false;

  @Output()
  isOpenModalEvent = new EventEmitter<boolean>();

  removeItemFromCart = inject(RemoveFromCart);

  handleModal() {
    this.isOpenModalEvent.emit(!this.isOpen);
    this.removeItemFromCart.removeAllFromCart$([]);
    window.scrollTo(0, 0);
  }
}
