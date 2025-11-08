import { AfterViewInit, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductCartList } from './product-cart-list/product-cart-list';
import { YourCart } from './your-cart/your-cart';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(SplitText);
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductCartList, YourCart],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements AfterViewInit {
  protected readonly title = signal('product-list-with-cart');

  ngAfterViewInit() {
    let mm = gsap.matchMedia();

    let split = SplitText.create('.main-title', { type: 'chars,words,lines' });
    mm.add('(min-width: 600px)', () => {
      gsap.from(split.chars, {
        duration: 0.5,
        opacity: 0,
        ease: 'power2.inOut',
      });

      gsap.from(split.chars, {
        duration: 1,
        x: 200,
        ease: 'power2.inOut',
        stagger: 0.05,
      });
    });

    mm.add('(max-width: 599px)', () => {
      gsap.from(split.chars, {
        duration: 0.5,
        opacity: 0,
        ease: 'power2.inOut',
      });

      gsap.from(split.chars, {
        duration: 1,
        x: '100vw - 24px',
        ease: 'power2.inOut',
        stagger: 0.05,
      });
    });
  }
}
