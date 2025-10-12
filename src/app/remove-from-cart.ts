import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RemoveFromCart {
  productToRemove = new Subject<string>();
  removeAllProducts = new Subject();

  productToRemoveObservable = this.productToRemove.asObservable();
  removeAllProductsObservable = this.removeAllProducts.asObservable();

  removeFromCart$(product$: any) {
    this.productToRemove.next(product$);
  }

  removeAllFromCart$(product$: any) {
    this.removeAllProducts.next(product$);
  }
}
