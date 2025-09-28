import { NgClass } from '@angular/common';
import { Component, inject, Input, OnInit, signal, computed } from '@angular/core';
import { AddToCart } from '../add-to-cart';

interface CartModel {
  name: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-product-cart',
  imports: [NgClass],
  templateUrl: './product-cart.html',
  styleUrl: './product-cart.scss',
})
export class ProductCart implements OnInit {
  @Input()
  category = '';

  @Input()
  name = '';

  @Input()
  price = 0;

  @Input()
  imgUrl = {
    desktop: '',
    mobile: '',
    tablet: '',
  };

  cartItems: any = signal([]);
  addToYourCart = inject(AddToCart);

  ngOnInit(): void {
    this.addToYourCart.productsInCartObservable.subscribe((name$) => {
      this.cartItems.set([...this.cartItems(), name$]);
    });
  }

  cItems = computed(() => {
    return this.cartItems()
      .filter((item: CartModel) => {
        return item.name === this.name;
      })
      .map((item: CartModel) => item.quantity);
  });

  addToCart(name: string) {
    if (
      !this.cartItems().some((item: CartModel) => {
        return item.name === name;
      })
    ) {
      this.addToYourCart.addToCart$({ name: this.name, quantity: 1, price: this.price });
    }
  }

  comp = computed(() => {
    return this.cartItems().some((item: CartModel) => {
      return item.name === this.name;
    });
  });
}
