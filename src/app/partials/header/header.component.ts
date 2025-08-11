import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private router: Router) {}
  isLogged: boolean = false;

  ngOnInit(): void {
    if (localStorage.getItem('userToken')) {
      this.isLogged = true;
    }
  }

  logout(): void {
    localStorage.removeItem('userToken');
    this.isLogged = false;
    this.router.navigate(['/login']);
  }
}
