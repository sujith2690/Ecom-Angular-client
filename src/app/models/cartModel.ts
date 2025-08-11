import { Book } from './bookModel';

export interface Cart {
  book: Book;
  price: number;
  quantity: number;
}
