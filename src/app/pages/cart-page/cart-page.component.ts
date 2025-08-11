import { Component } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Cart } from 'src/app/models/cartModel';
import { CartService } from 'src/app/services/cart/cart.service';
import { LibraryService } from 'src/app/services/library/library.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent {
  constructor(
    private library: LibraryService,
    private cart: CartService,
    private toast: HotToastService
  ) {}

  items: Cart[] = [];
  total: number = 0;
  shipping: number = 0;

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks() {
    this.cart.viewCart().subscribe((result) => {
      this.items = result.data.items;
      this.total = result.data.total;
      this.calculateShipping();
    });
  }

  calculateShipping(): void {
    let count: number = 0;
    for (let i: number = 0; i < this.items.length; i++) {
      count = count + this.items[i].quantity;
    }

    if (count < 3) this.shipping = 0;
    if (count >= 3 && count < 10) this.shipping = 100;
    if (count >= 10) this.shipping = 250;
  }

  increment(title: string): void {
    this.cart.doIncrement(title).subscribe((response) => {
      if (response.status === 200) {
        this.toast.success(response.message);
        this.getAllBooks();
      } else this.toast.error(response.message);
    });
  }

  decrement(title: string): void {
    this.cart.doDecrement(title).subscribe((response) => {
      if (response.status === 200) {
        this.toast.success(response.message);
        this.getAllBooks();
      } else this.toast.error(response.message);
    });
  }

  remove(title: string): void {
    const isConfirmed = confirm(
      `Are you sure you want to remove "${title}" from your cart?`
    );

    if (isConfirmed) {
      this.cart.removeFromCart(title).subscribe((response) => {
        if (response.status === 200) {
          this.getAllBooks();
          this.toast.success(response.message);
        } else {
          this.toast.error(response.message);
        }
      });
    }
  }
}
