import { CurrencyPipe } from '@angular/common';
import {
  Component,
  inject,
  computed,
  OnInit,
  OnChanges,
  signal,
  ElementRef,
  ViewChild,
  AfterViewChecked,
  QueryList,
  ViewChildren,
  AfterViewInit,
  viewChildren,
  AfterContentInit,
} from '@angular/core';
import { AddToCart } from '../add-to-cart';
import { RemoveFromCart } from '../remove-from-cart';
import { CartModel } from '../models/CartModel';
import { ProductsOrder } from '../products-order/products-order';
import gsap from 'gsap';
gsap.registerPlugin();
@Component({
  selector: 'app-your-cart',
  imports: [CurrencyPipe, ProductsOrder],
  templateUrl: './your-cart.html',
  styleUrl: './your-cart.scss',
})
export class YourCart implements OnInit, AfterViewInit {
  cartItem: any = signal([]);
  cartItemToRemove = signal<{ name: string; index: string }>({ name: '', index: '' });
  isOpen = signal(false);
  isDeleteBtnClicked = signal({ isClicked: false, buttonClicked: '' });

  removeItemFromCart = inject(RemoveFromCart);
  addToCart = inject(AddToCart);

  @ViewChild('cartWrapper') cartWrapper!: ElementRef<HTMLDivElement>;
  @ViewChildren('orderItem', { read: ElementRef }) orderItem!: QueryList<ElementRef>;

  ngOnInit(): void {
    this.addToCart.productsInCartObservable.subscribe((name$) => {
      this.isDeleteBtnClicked.set({ isClicked: false, buttonClicked: '' });
      setTimeout(() => {
        this.cartItem.update((items: CartModel[]) => {
          if (items.find((item: any) => item.name === name$.name)) {
            return [...this.cartItem()];
          }
          return [...this.cartItem(), name$];
        });
      }, 750);
      gsap.to('.order-overall-price', {
        scale: '1.1',
        duration: 0.15,
        yoyo: true,
        repeat: 3,
        delay: 1.5,
      });
      gsap.to('.order-item-quantity', {
        scale: '2',
        duration: 0.5,
        yoyo: true,
        repeat: 1,
      });

      if (this.cartItem().every((item: any) => item.name !== name$.name)) {
        gsap.to('.order-items', {
          height: (document.querySelector('.order-items') as HTMLElement)?.clientHeight + 84,
          duration: 1.5,
          ease: 'elastic.out',
        });
      }
    });

    this.removeItemFromCart.productToRemoveObservable.subscribe((name$) => {
      gsap.to('.order-overall-price', {
        scale: '0.9',
        duration: 0.15,
        yoyo: true,
        repeat: 3,
        delay: 0.2,
      });
      this.isDeleteBtnClicked.set({ isClicked: true, buttonClicked: 'minus' });
      const yeahyeahyeahs = this.cartItem().findIndex((item: any) => item.name === name$);
      this.cartItemToRemove.set({ name: name$, index: yeahyeahyeahs });
      let idx = Number(this.cartItemToRemove().index);
      if (
        this.isDeleteBtnClicked().isClicked === true &&
        this.isDeleteBtnClicked().buttonClicked === 'minus'
      ) {
        setTimeout(() => {
          this.cartItem.update((items: CartModel[]) =>
            items.filter((item: CartModel) => {
              return item.name !== this.cartItemToRemove().name;
            })
          );
          Array.from(document.querySelectorAll('.order-item')).forEach((item, inde) => {
            (item as HTMLElement).style.transform = 'translateY(0px)';
          });
          Array.from(document.querySelectorAll('.horizontal-divider')).forEach((item, inde) => {
            (item as HTMLElement).style.transform = 'translateY(0px)';
          });
        }, 3000 + Array.from(document.querySelectorAll('.order-item')).length * 100);
        let tl = gsap.timeline();
        tl.set('.order-item', { y: 0 });
        tl.set('.horizontal-divider', { y: 0 });
        tl.to(
          [
            document.querySelectorAll('.order-item')[idx],
            document.querySelectorAll('.horizontal-divider')[idx],
          ],
          {
            xPercent: 100,
            duration: 1.25,
            ease: 'elastic.inOut',
          }
        );
        tl.to(
          [
            document.querySelectorAll('.order-item')[idx],
            document.querySelectorAll('.horizontal-divider')[idx],
          ],
          {
            opacity: 0,
            yPercent: -100,
            duration: 1,
            ease: 'elastic.inOut',
          },
          '-=0.3'
        );
        Array.from(document.querySelectorAll('.order-item')).forEach((item, inde) => {
          if (inde > idx && idx < document.querySelectorAll('.order-item').length) {
            tl.to(document.querySelectorAll('.order-item')[inde], {
              y: -84,
              duration: 0.5,
            });
            tl.to(
              document.querySelectorAll('.horizontal-divider')[inde],
              {
                y: -84,
                duration: 0.5,
              },
              '<0.01'
            );
          }
        });
        tl.to(
          '.order-items',
          {
            height: (document.querySelector('.order-items') as HTMLElement)?.clientHeight - 84,
            duration: 0.75,
          },
          '-=1.35'
        );
      }
    });

    this.removeItemFromCart.removeAllProductsObservable.subscribe(() => {
      this.cartItem.set([]);
    });
  }

  removeFromCart(name: string, index: number) {
    this.isDeleteBtnClicked.set({ isClicked: true, buttonClicked: 'cross' });
    this.cartItemToRemove.set({ name: name, index: index.toString() });
    const tl = gsap.timeline();
    setTimeout(() => {
      this.cartItem.update((items: CartModel[]) =>
        items.filter((item: CartModel) => {
          return item.name !== this.cartItemToRemove().name;
        })
      );
      Array.from(document.querySelectorAll('.order-item')).forEach((item) => {
        (item as HTMLElement).style.transform = 'translateY(0px)';
      });
      Array.from(document.querySelectorAll('.horizontal-divider')).forEach((item) => {
        (item as HTMLElement).style.transform = 'translateY(0px)';
      });
      this.removeItemFromCart.removeFromCart$(name);
    }, 2000 + Array.from(document.querySelectorAll('.order-item')).length * 100);
    tl.set('.order-item', { y: 0 });
    tl.set('.horizontal-divider', { y: 0 });
    tl.to(
      [
        document.querySelectorAll('.order-item')[index],
        document.querySelectorAll('.horizontal-divider')[index],
      ],
      {
        xPercent: 100,
        duration: 1.25,
        ease: 'elastic.inOut',
      }
    );
    tl.to(
      [
        document.querySelectorAll('.order-item')[index],
        document.querySelectorAll('.horizontal-divider')[index],
      ],
      {
        opacity: 0,
        yPercent: -100,
        duration: 0.75,
        ease: 'elastic.inOut',
      },
      '-=0.3'
    );
    Array.from(document.querySelectorAll('.order-item')).forEach((item, inde) => {
      if (inde > index && index < document.querySelectorAll('.order-item').length) {
        tl.to(document.querySelectorAll('.order-item')[inde], {
          y: -84,
          duration: 0.375,
        });
        tl.to(
          document.querySelectorAll('.horizontal-divider')[inde],
          {
            y: -84,
            duration: 0.375,
          },
          '<0.01'
        );
      }
    });
    tl.to(
      '.order-items',
      {
        height: (document.querySelector('.order-items') as HTMLElement)?.clientHeight - 84,
        duration: 0.5,
      },
      '-=1'
    );
  }

  ngAfterViewInit(): void {
    this.orderItem.changes.subscribe((i) => {
      if (!this.isDeleteBtnClicked().isClicked) {
        const tl = gsap.timeline();
        tl.set(['.order-item:last-of-type', '.horizontal-divider:last-of-type'], {
          opacity: 0,
          duration: 0.01,
        });
        tl.to(['.order-item:last-of-type', '.horizontal-divider:last-of-type'], {
          yPercent: -100,
          xPercent: 100,
          duration: 0.01,
        });
        tl.to(['.order-item:last-of-type', '.horizontal-divider:last-of-type'], {
          opacity: 1,
          xPercent: 100,
          yPercent: 0,
          duration: 0.75,
          ease: 'elastic.inOut',
        });
        tl.to(
          ['.order-item:last-of-type', '.horizontal-divider:last-of-type'],
          {
            xPercent: 0,
            duration: 1.25,
            ease: 'elastic.inOut',
          },
          '<0.4'
        );
      }
    });
  }

  orderOverallPrice = computed(() => {
    return this.cartItem().reduce((acc: number, item: CartModel) => {
      return (acc += item.price * item.quantity);
    }, 0);
  });

  isOpenModalFn() {
    this.isOpen.set(true);
  }

  isOpenModal(status: boolean) {
    this.isOpen.set(status);
  }

  handleQuantityEnterAnimation(event: Event) {
    const hi = (event.target as HTMLElement)?.closest('.remove-from-cart-button');
    gsap.to(hi, {
      rotate: '360deg',
      scale: 1.1,
      duration: 0.25,
      ease: 'power2.inOut',
    });
  }

  handleQuantityLeaveAnimation(event: Event) {
    const hi = (event.target as HTMLElement)?.closest('.remove-from-cart-button');
    gsap.to(hi, {
      rotate: '-360deg',
      scale: 1,
      duration: 0.25,
      ease: 'power2.inOut',
    });
  }
}
