import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RemoveFromCart {
  productToRemove = new Subject<string>();

  productToRemoveObservable = this.productToRemove.asObservable();

  removeFromCart$(product$: any) {
    this.productToRemove.next(product$);
  }
}
