import { Component, OnInit } from '@angular/core';
import { Data } from '../data';
import { ProductCart } from '../product-cart/product-cart';
import { gsap } from 'gsap';

@Component({
  selector: 'app-product-cart-list',
  imports: [ProductCart],
  templateUrl: './product-cart-list.html',
  styleUrl: './product-cart-list.scss',
})
export class ProductCartList implements OnInit {
  recipes: any[] = [];

  constructor(private dataService: Data) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe({
      next: (data) => (this.recipes = data),
      error: (error) => console.error(error),
    });

    gsap.from('.recipes-list li', {
      duration: 0.75,
      y: 50,
      opacity: 0.15,
      ease: 'power1.inOut',
      stagger: {
        grid: 'auto',
        from: 'end',
        axis: 'y',
        amount: 0.75,
        ease: 'power4.inOut',
      },
    });
  }
}
