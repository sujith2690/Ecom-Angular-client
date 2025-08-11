import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Book } from 'src/app/models/bookModel';
import { CartService } from 'src/app/services/cart/cart.service';
import { LibraryService } from 'src/app/services/library/library.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css'],
})
export class CategoryPageComponent {
  constructor(
    private router: ActivatedRoute,
    private library: LibraryService,
    private cart: CartService,
    private toast: HotToastService
  ) {}

  categoryDescriptions: { [key: string]: string } = {
    Thriller:
      'A genre of fiction that features intense excitement, suspense, and anticipation, often involving crime, mystery, and detective work.',
    Horror:
      'A genre of fiction intended to frighten, scare, or disgust readers, often involving supernatural elements, monsters, or psychological terror.',
    Fiction:
      'A literary genre that includes imaginative storytelling, invented characters, and events not based on real life.',
    History:
      'The study of past events, particularly in human societies, encompassing various subjects such as politics, culture, economics, and social changes.',
  };

  category: string = '';
  category_description: string = '';
  books: Book[] = [];

  ngOnInit(): void {
    let getParamId = this.router.snapshot.paramMap.get('id');
    this.category = JSON.stringify(getParamId);
    this.category = this.category.replace(/['"]+/g, '');
    this.category_description = this.categoryDescriptions[this.category];
    this.getCategoryBooks();
  }

  getCategoryBooks(): void {
    this.library.fetchCategoryBooks(this.category).subscribe((result) => {
      this.books = result.data;
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
