import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddToCart {
  productsInCart = new Subject<
    {
      name: string;
      quantity: 1;
      price: number;
    }[]
  >();

  productsInCartObservable = this.productsInCart.asObservable();

  addToCart$(product$: any) {
    this.productsInCart.next(product$);
  }
}
