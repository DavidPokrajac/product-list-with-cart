import { TestBed } from '@angular/core/testing';

import { RemoveFromCart } from './remove-from-cart';

describe('RemoveFromCart', () => {
  let service: RemoveFromCart;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoveFromCart);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
