import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AddToCart } from '../add-to-cart';

@Component({
  selector: 'app-your-cart',
  imports: [CurrencyPipe],
  templateUrl: './your-cart.html',
  styleUrl: './your-cart.scss',
})
export class YourCart implements OnInit {
  cartItem: any = [];
  constructor(private nameService: AddToCart) {}
  ngOnInit(): void {
    this.nameService.productsInCartObservable.subscribe((name$) => {
      this.cartItem = [...this.cartItem, name$];
    });
  }
}
