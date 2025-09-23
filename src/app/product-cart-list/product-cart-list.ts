import { Component, OnInit } from '@angular/core';
import { Data } from '../data';

@Component({
  selector: 'app-product-cart-list',
  imports: [],
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
  }
}
