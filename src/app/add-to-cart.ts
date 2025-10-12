import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddToCart {
  productsInCart = new Subject<{
    name: string;
    quantity: number;
    price: number;
    thumbnail: string;
  }>();

  productsInCartObservable = this.productsInCart.asObservable();

  addToCart$(product$: any) {
    this.productsInCart.next(product$);
  }
}
