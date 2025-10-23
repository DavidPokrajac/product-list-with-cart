import { CurrencyPipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  OnInit,
  AfterViewChecked,
  AfterViewInit,
} from '@angular/core';
import { RemoveFromCart } from '../remove-from-cart';
import { gsap } from 'gsap';
import { prependListener } from 'node:process';
gsap.registerPlugin();
@Component({
  selector: 'app-products-order',
  imports: [CurrencyPipe],
  templateUrl: './products-order.html',
  styleUrl: './products-order.scss',
})
export class ProductsOrder implements AfterViewChecked {
  @Input()
  cartItem: any = [];

  @Input()
  orderOverallPrice: number = 0;

  @Input()
  isOpen = false;

  @Output()
  isOpenModalEvent = new EventEmitter<boolean>();

  removeItemFromCart = inject(RemoveFromCart);

  ngAfterViewChecked(): void {
    if (this.isOpen) {
      for (let i = 0; i < 50; i++) {
        let j = document.createElement('img');
        j.src = 'assets/images/icon-order-confirmed.svg';
        j.className = 'prize';
        (document.querySelector('.order-dialog-wrapper') as HTMLElement).append(j);
      }
      let mm = gsap.matchMedia();
      mm.add('(max-width: 767px)', () => {
        let tl = gsap.timeline();
        tl.set('.prize', {
          position: 'absolute',
          left: 'random(0, 500)',
          top: 'random(0, 900)',
        });
        tl.from('.prize', {
          opacity: 0,
          duration: 0.1,
        });
        tl.to('.prize', {
          top: 'random(-10, -50)',
          opacity: 0.25,
          duration: 4,
          ease: 'power4.inOut',
        });
        tl.to(
          '.prize',
          {
            scale: '0',
            duration: 1,
            ease: 'power4.inOut',
          },
          '<2.5'
        );
      });
      mm.add('(max-width: 1023px)', () => {
        let tl = gsap.timeline();
        tl.set('.prize', {
          position: 'absolute',
          left: 'random(0, 1080)',
          top: 'random(0, 1000)',
        });
        tl.from('.prize', {
          opacity: 0,
          duration: 0.15,
        });
        tl.to(
          '.prize',
          {
            top: 'random(-10, -500)',
            opacity: 0.25,
            duration: 5,
            ease: 'power4.inOut',
          },
          '<0.2'
        );
        tl.to(
          '.prize',
          {
            scale: '0',
            duration: 1,
            ease: 'power4.inOut',
          },
          '<2.5'
        );
      });
      mm.add('(min-width: 1024px)', () => {
        let tl = gsap.timeline();
        tl.set('.prize', {
          position: 'absolute',
          left: 'random(0, 1400)',
          top: 'random(0, 1000)',
        });
        tl.from('.prize', {
          opacity: 0,
          duration: 0.15,
        });
        tl.to(
          '.prize',
          {
            top: 'random(-50, -200)',
            opacity: 0.25,
            duration: 5,
            ease: 'power4.inOut',
          },
          '<0.2'
        );
        tl.to(
          '.prize',
          {
            scale: '0',
            duration: 1,
            ease: 'power4.inOut',
          },
          '<2.5'
        );
      });
    }
  }

  outOfScreenCheck() {
    if (
      Array.from(document.querySelectorAll('.prize')).every(
        (prize) => (prize as HTMLElement).getBoundingClientRect().top < 0
      )
    ) {
      document.querySelectorAll('.prize').forEach((prize) => {
        prize.remove();
      });
    } else {
      requestAnimationFrame(() => this.outOfScreenCheck());
    }
  }

  handleModal() {
    this.isOpenModalEvent.emit(!this.isOpen);
    this.removeItemFromCart.removeAllFromCart$([]);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    requestAnimationFrame(() => this.outOfScreenCheck());
  }
}
