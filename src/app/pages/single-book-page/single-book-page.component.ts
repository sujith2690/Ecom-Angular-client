import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Book } from 'src/app/models/bookModel';
import { CartService } from 'src/app/services/cart/cart.service';
import { LibraryService } from 'src/app/services/library/library.service';

@Component({
  selector: 'app-single-book-page',
  templateUrl: './single-book-page.component.html',
  styleUrls: ['./single-book-page.component.css'],
})
export class SingleBookPageComponent {
  constructor(
    private router: ActivatedRoute,
    private library: LibraryService,
    private cart: CartService,
    private toast: HotToastService
  ) {}

  title: string = '';
  details!: Book;
  alreadyInCart: boolean = false;

  ngOnInit(): void {
    let getParamId = this.router.snapshot.paramMap.get('id');
    this.title = JSON.stringify(getParamId);
    this.title = this.title.replace(/['"]+/g, '');
    this.getBookDetails();
    this.isBookInCart(this.title);
  }

  getBookDetails(): void {
    this.library.getBookDetails(this.title).subscribe((result) => {
      this.details = result.data[0];
    });
  }

  isBookInCart(title: string): void {
    this.cart.isInCart(title).subscribe((response) => {
      if (response.status === 200) this.alreadyInCart = true;
    });
  }

  addToCart(): void {
    this.cart.addToCart(this.title).subscribe((response) => {
      if (response.status === 400) {
        this.toast.error(response.message);
      }
      if (response.status === 305) {
        this.toast.error(response.message);
      }
      if (response.status === 200) {
        this.toast.success(response.message);
        this.alreadyInCart = true;
      }
    });
  }
}
