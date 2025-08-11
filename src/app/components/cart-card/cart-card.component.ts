import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart-card',
  templateUrl: './cart-card.component.html',
  styleUrls: ['./cart-card.component.css'],
})
export class CartCardComponent {
  plus = faPlus;
  minus = faMinus;
  delete = faTrash;

  @Input() title: string = '';
  @Input() description: string = '';
  @Input() category: string = '';
  @Input() author: string = '';
  @Input() price: string = '';
  @Input() quantity: string = '';
  @Input() image: string = '';

  @Output() increment = new EventEmitter<string>();
  @Output() decrement = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();

  total: number = 0;

  ngOnInit() {
    this.calculateTotal(this.price, this.quantity);
  }

  calculateTotal(price: string, quantity: string): void {
    const total = Number(price) * Number(quantity);
    this.total = total;
  }

  doIncrement(title: string) {
    this.increment.emit(title);
    const newTotal: number = Number(this.total) + Number(this.price);
    let newQuantity: number = Number(this.quantity);
    newQuantity++;
    this.quantity = JSON.stringify(newQuantity);
    this.total = newTotal;
  }

  doDecrement(title: string) {
    if (Number(this.quantity) === 1) {
      this.doDelete(title);
    } else {
      this.decrement.emit(title);
      const newTotal: number = Number(this.total) - Number(this.price);
      let newQuantity: number = Number(this.quantity);
      newQuantity--;
      this.quantity = JSON.stringify(newQuantity);
      this.total = newTotal;
    }
  }

  doDelete(title: string) {
    this.remove.emit(title);
  }
}
