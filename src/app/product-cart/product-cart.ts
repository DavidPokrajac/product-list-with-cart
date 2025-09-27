import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-cart',
  imports: [],
  templateUrl: './product-cart.html',
  styleUrl: './product-cart.scss',
})
export class ProductCart {
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

  constructor() {
    console.warn(this.category);
  }
}
