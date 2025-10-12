import { CurrencyPipe } from '@angular/common';
import { Component, inject, computed, OnInit, signal } from '@angular/core';
import { AddToCart } from '../add-to-cart';
import { RemoveFromCart } from '../remove-from-cart';
import { CartModel } from '../models/CartModel';
import { ProductsOrder } from '../products-order/products-order';

@Component({
  selector: 'app-your-cart',
  imports: [CurrencyPipe, ProductsOrder],
  templateUrl: './your-cart.html',
  styleUrl: './your-cart.scss',
})
export class YourCart implements OnInit {
  cartItem: any = signal([]);
  cartItemToRemove = signal<string | null>(null);
  isOpen = signal(false);

  removeItemFromCart = inject(RemoveFromCart);
  addToCart = inject(AddToCart);

  ngOnInit(): void {
    this.addToCart.productsInCartObservable.subscribe((name$) => {
      this.cartItem.update((items: CartModel[]) => {
        if (items.find((item: any) => item.name === name$.name)) {
          return [...this.cartItem()];
        }
        return [...this.cartItem(), name$];
      });
    });

    this.removeItemFromCart.productToRemoveObservable.subscribe((name$) => {
      this.cartItemToRemove.set(name$);
      this.cartItem.update((items: CartModel[]) =>
        items.filter((item: CartModel) => {
          return item.name !== this.cartItemToRemove();
        })
      );
    });

    this.removeItemFromCart.removeAllProductsObservable.subscribe(() => {
      this.cartItem.set([]);
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
    return this.cartItem().reduce((acc: number, item: CartModel) => {
      return (acc += item.price * item.quantity);
    }, 0);
  });

  isOpenModalFn() {
    this.isOpen.set(true);
  }

  isOpenModal(status: boolean) {
    this.isOpen.set(status);
  }
}
