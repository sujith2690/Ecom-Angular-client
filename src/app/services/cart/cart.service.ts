import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  private server: string = 'https://ecom-angular-server.onrender.com/cart/';
  // private server: string = 'http://localhost:5001/cart/';

  viewCart(): Observable<any> {
    return this.http.get(`${this.server}`);
  }

  isInCart(book: string): Observable<{ status: number; message: string }> {
    return this.http.get<{ status: number; message: string }>(
      `${this.server}checkCart/${book}`
    );
  }

  addToCart(product: string): Observable<{ status: number; message: string }> {
    return this.http.put<{ status: number; message: string }>(
      `${this.server}addToCart`,
      { book: product }
    );
  }

  doIncrement(
    product: string
  ): Observable<{ status: number; message: string }> {
    return this.http.patch<{ status: number; message: string }>(
      `${this.server}increment`,
      { book: product }
    );
  }

  doDecrement(
    product: string
  ): Observable<{ status: number; message: string }> {
    return this.http.patch<{ status: number; message: string }>(
      `${this.server}decrement`,
      { book: product }
    );
  }

  removeFromCart(
    product: string
  ): Observable<{ status: number; message: string }> {
    return this.http.delete<{ status: number; message: string }>(
      `${this.server}delete/${product}`
    );
  }
}
