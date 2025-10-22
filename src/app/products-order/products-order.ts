import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RemoveFromCart } from '../remove-from-cart';
import { gsap } from 'gsap';
gsap.registerPlugin();
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
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
}
