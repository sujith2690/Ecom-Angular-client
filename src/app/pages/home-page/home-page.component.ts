import { Component } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Book } from 'src/app/models/bookModel';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { LibraryService } from 'src/app/services/library/library.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  constructor(
    private library: LibraryService,
    private cart: CartService,
    private toast: HotToastService
  ) {}

  books: Book[] = [];
  books1: Book[] = [];
  books2: Book[] = [];

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks() {
    this.library.allBooks().subscribe((result) => {
      this.books = result.data;
      this.books1 = this.books.slice(0, 12);
      this.books2 = this.books.slice(12);
    });
  }

  addToCart(title: string): void {
    this.cart.addToCart(title).subscribe((response) => {
      if (response.status === 400) {
        this.toast.error(response.message);
      }
      if (response.status === 305) {
        this.toast.error(response.message);
      }
      if (response.status === 200) {
        this.toast.success(response.message);
      }
    });
  }
}
