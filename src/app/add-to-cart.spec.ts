import { TestBed } from '@angular/core/testing';

import { AddToCart } from './add-to-cart';

describe('AddToCart', () => {
  let service: AddToCart;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddToCart);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
