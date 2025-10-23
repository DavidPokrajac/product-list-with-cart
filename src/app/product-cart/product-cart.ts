import { NgClass, CurrencyPipe } from '@angular/common';
import { Component, inject, Input, OnInit, signal, computed } from '@angular/core';
import { AddToCart } from '../add-to-cart';
import { RemoveFromCart } from '../remove-from-cart';
import { CartModel } from '../models/CartModel';
import { gsap, random } from 'gsap/gsap-core';
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(SplitText);
@Component({
  selector: 'app-product-cart',
  imports: [NgClass, CurrencyPipe],
  templateUrl: './product-cart.html',
  styleUrl: './product-cart.scss',
})
export class ProductCart implements OnInit {
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
    thumbnail: '',
  };

  cartItems: any = signal([]);
  removedItem = signal<string | null>(null);
  addToYourCart = inject(AddToCart);
  itemToRemove = inject(RemoveFromCart);

  ngOnInit(): void {
    this.addToYourCart.productsInCartObservable.subscribe((name$) => {
      this.cartItems.set([...this.cartItems(), name$]);
    });

    this.itemToRemove.productToRemoveObservable.subscribe((name$) => {
      this.removedItem.set(name$);
      this.cartItems.update((items: CartModel[]) => {
        return items.filter((item: CartModel) => item.name !== this.removedItem());
      });
    });

    this.itemToRemove.removeAllProductsObservable.subscribe(() => {
      this.cartItems.set([]);
    });
  }

  addToCart(name: string) {
    if (
      !this.cartItems().some((item: CartModel) => {
        return item.name === name;
      })
    ) {
      this.addToYourCart.addToCart$({
        name: this.name,
        quantity: 1,
        price: this.price,
        thumbnail: this.imgUrl.thumbnail,
      });
    }
  }

  handleQuantityDecrement(event: Event, name: string) {
    const hi = (event.target as Element)
      ?.closest('.quantity-handler')
      ?.querySelector('.item-quantity') as HTMLElement;
    const timeline = gsap.timeline();
    timeline.to(hi, {
      x: -100,
      duration: 0.75,
      ease: 'elastic.inOut(1, 0.5)',
    });
    timeline.to(
      hi,
      {
        opacity: 0,
        duration: 0.4,
        ease: 'power4.inOut',
      },
      '-=0.55'
    );
    timeline.to(hi, {
      opacity: 0,
      x: 125,
      duration: 0.25,
      ease: 'elastic.inOut(1, 0.75)',
    });
    timeline.to(hi, {
      opacity: 1,
      x: 0,
      duration: 0.5,
      ease: 'elastic.inOut(1, 0.75)',
    });
    setTimeout(() => {
      this.cartItems.update((items: any) => {
        return items
          .filter((item: any) => item.name === name)
          .map((i: any, index: number) => {
            if (i.quantity === 1) {
              this.removedItem.set(name);
              this.cartItems().splice(index, 1);
              this.itemToRemove.removeFromCart$(this.removedItem());
              return this.cartItems;
            }
            i.quantity = i.quantity - 1;
            this.addToYourCart.addToCart$({
              name: this.name,
              quantity: i.quantity,
              price: this.price,
            });
            return i;
          });
      });
    }, 1000);
  }

  handleQuantityIncrement(event: Event, name: string) {
    const hi = (event.target as Element)
      ?.closest('.quantity-handler')
      ?.querySelector('.item-quantity') as HTMLElement;
    const timeline = gsap.timeline();
    timeline.to(hi, {
      x: 100,
      duration: 0.75,
      ease: 'elastic.inOut(1, 0.5)',
    });
    timeline.to(
      hi,
      {
        opacity: 0,
        duration: 0.4,
        ease: 'power4.inOut',
      },
      '-=0.55'
    );
    timeline.to(hi, {
      opacity: 0,
      x: -125,
      duration: 0.25,
      ease: 'elastic.inOut(1, 0.75)',
    });
    timeline.to(hi, {
      opacity: 1,
      x: 0,
      duration: 0.5,
      ease: 'elastic.inOut(1, 0.75)',
    });
    setTimeout(() => {
      this.cartItems.update((items: any) => {
        return items
          .filter((item: any) => item.name === name)
          .map((i: any) => {
            i.quantity = i.quantity + 1;
            this.addToYourCart.addToCart$({
              name: this.name,
              quantity: i.quantity,
              price: this.price,
            });
            return i;
          });
      });
    }, 1000);
  }

  handleEnterAnimation(event: Event) {
    const hi = (event.target as HTMLElement)?.querySelector('.add-to-cart-icon');
    let tle = gsap.timeline();
    tle.to(hi, {
      scale: 1.2,
      duration: 0.75,
      ease: 'power2.inOut',
    });
    tle
      .to(hi, {
        rotate: '-30deg',
        duration: 0.2,
        ease: 'power2.inOut',
        repeat: 3,
        yoyo: true,
      })
      .play();
    let split = SplitText.create(event.target as HTMLElement, { type: 'chars,words,lines' });
    tle.to(
      split.chars,
      {
        duration: 0.5,
        y: 'random(-5, 10)',
        ease: 'power2.inOut',
        stagger: 0.1,
      },
      '<-0.75'
    );
    tle.to(
      split.chars,
      {
        duration: 0.5,
        y: 0,
        ease: 'power2.inOut',
        stagger: 0.1,
      },
      '-=1.1'
    );
  }

  handleLeaveAnimation(event: Event) {
    const hi = (event.target as HTMLElement)?.querySelector('.add-to-cart-icon');
    gsap
      .to(hi, {
        scale: '1',
        duration: 0.5,
        ease: 'power2.inOut',
      })
      .play();
  }

  handleQuantityEnterAnimation(event: Event) {
    const hi = (event.target as HTMLElement)?.closest('.quantity-btn');
    gsap.to(hi, {
      rotate: '360deg',
      scale: 1.1,
      duration: 0.25,
      ease: 'power2.inOut',
    });
  }

  handleQuantityLeaveAnimation(event: Event) {
    const hi = (event.target as HTMLElement)?.closest('.quantity-btn');
    gsap.to(hi, {
      rotate: '-360deg',
      scale: 1,
      duration: 0.25,
      ease: 'power2.inOut',
    });
  }

  itemQuantity = computed(() => {
    return this.cartItems()
      .filter((item: CartModel) => {
        return item.name === this.name;
      })
      .map((item: CartModel) => item.quantity);
  });

  itemsInCart = computed(() => {
    return this.cartItems().some((item: CartModel) => {
      return item.name === this.name;
    });
  });
}
