import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCartPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import { TruncateTextDirective } from 'src/app/directives/truncate-text.directive';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  providers: [TruncateTextDirective],
})
export class ProductCardComponent {
  constructor(private cart: CartService) {}
  add = faCartPlus;
  check = faCheck;

  @Input() title: string = '';
  @Input() description: string = '';
  @Input() category: string = '';
  @Input() author: string = '';
  @Input() price: number = 0;
  @Input() backgroundImageUrl: string = '';

  @Output() addToCart = new EventEmitter<string>();
  alreadyInCart: boolean = false;
  cost: number = 0;

  ngOnInit(): void {
    //   this.isBookInCart(this.title);
    this.cost = Number(this.price);
    console.log(this.cost);
  }

  isBookInCart(title: string): void {
    this.cart.isInCart(title).subscribe((response) => {
      if (response.status === 200) this.alreadyInCart = true;
    });
  }

  addBook(title: string) {
    this.addToCart.emit(title);
  }
}
