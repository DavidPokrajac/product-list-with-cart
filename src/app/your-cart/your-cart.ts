import { CurrencyPipe } from '@angular/common';
import { Component, inject, computed, OnInit, signal } from '@angular/core';
import { AddToCart } from '../add-to-cart';
import { RemoveFromCart } from '../remove-from-cart';
import { CartModel } from '../models/CartModel';

@Component({
  selector: 'app-your-cart',
  imports: [CurrencyPipe],
  templateUrl: './your-cart.html',
  styleUrl: './your-cart.scss',
})
export class YourCart implements OnInit {
  cartItem: any = signal([]);
  cartItemToRemove = signal<string | null>(null);

  removeItemFromCart = inject(RemoveFromCart);
  addToCart = inject(AddToCart);

  ngOnInit(): void {
    this.addToCart.productsInCartObservable.subscribe((name$) => {
      this.cartItem.set([...this.cartItem(), name$]);
      console.log(this.cartItem());
    });

    this.removeItemFromCart.productToRemoveObservable.subscribe((name$) => {
      this.cartItemToRemove.set(name$);
    });
  }

  removeFromCart(name: string) {
    this.removeItemFromCart.removeFromCart$(name);
    this.cartItemToRemove.set(name);
    this.cartItem.update((items: CartModel[]) =>
      items.filter((item: CartModel) => {
        return item.name !== this.cartItemToRemove();
      })
    );
  }

  orderOverallPrice = computed(() => {
    let price = 0;
    this.cartItem().forEach((item: CartModel) => {
      price += item.price;
    });
    return price;
  });
}
