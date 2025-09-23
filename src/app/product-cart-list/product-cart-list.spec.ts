import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCartList } from './product-cart-list';

describe('ProductCartList', () => {
  let component: ProductCartList;
  let fixture: ComponentFixture<ProductCartList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCartList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCartList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
