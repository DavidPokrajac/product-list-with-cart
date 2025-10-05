import { NgClass, CurrencyPipe } from '@angular/common';
import { Component, inject, Input, OnInit, signal, computed } from '@angular/core';
import { AddToCart } from '../add-to-cart';
import { RemoveFromCart } from '../remove-from-cart';
import { CartModel } from '../models/CartModel';

@Component({
  selector: 'app-product-cart',
  imports: [NgClass, CurrencyPipe],
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
  removedItem = signal<string | null>(null);
  addToYourCart = inject(AddToCart);
  itemToRemove = inject(RemoveFromCart);

  ngOnInit(): void {
    this.addToYourCart.productsInCartObservable.subscribe((name$) => {
      this.cartItems.set([...this.cartItems(), name$]);
    });

    this.itemToRemove.productToRemoveObservable.subscribe((name$) => {
      this.removedItem.set(name$);
      this.cartItems.update((items: CartModel[]) => {
        return items.filter((item: CartModel) => item.name !== this.removedItem());
      });
    });
  }

  addToCart(name: string) {
    if (
      !this.cartItems().some((item: CartModel) => {
        return item.name === name;
      })
    ) {
      this.addToYourCart.addToCart$({ name: this.name, quantity: 1, price: this.price });
    }
  }

  handleQuantityDecrement(name: string) {
    this.cartItems.update((items: any) => {
      return items
        .filter((item: any) => item.name === name)
        .map((i: any, index: number) => {
          if (i.quantity === 1) {
            this.removedItem.set(name);
            this.cartItems().splice(index, 1);
            this.itemToRemove.removeFromCart$(this.removedItem());
            return this.cartItems;
          }
          i.quantity = i.quantity - 1;
          this.addToYourCart.addToCart$({
            name: this.name,
            quantity: i.quantity,
            price: this.price,
          });
          return i;
        });
    });
  }

  handleQuantityIncrement(name: string) {
    this.cartItems.update((items: any) => {
      return items
        .filter((item: any) => item.name === name)
        .map((i: any) => {
          i.quantity = i.quantity + 1;
          this.addToYourCart.addToCart$({
            name: this.name,
            quantity: i.quantity,
            price: this.price,
          });
          return i;
        });
    });
  }

  itemQuantity = computed(() => {
    return this.cartItems()
      .filter((item: CartModel) => {
        return item.name === this.name;
      })
      .map((item: CartModel) => item.quantity);
  });

  itemsInCart = computed(() => {
    return this.cartItems().some((item: CartModel) => {
      return item.name === this.name;
    });
  });
}
