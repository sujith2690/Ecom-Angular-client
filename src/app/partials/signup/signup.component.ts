import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { UserRegister } from 'src/app/models/userModel';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  @Output() signupOTP = new EventEmitter<void>();
  constructor(
    private service: AuthenticationService,
    private toast: HotToastService,
    private router: Router
  ) { }

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  loading: boolean = false;

  onSubmit() {
    if (this.password === this.confirmPassword) {
      if (
        !this.firstName.trim() ||
        !this.lastName.trim() ||
        !this.email.trim() ||
        !this.password.trim()
      ) {
        this.toast.error('Please fill every field');
        return;
      }

      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(this.email)) {
        this.toast.error('Please enter a valid email address.');
        return;
      }

      try {
        let user: UserRegister = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
        };
        this.loading = true;
        this.service.signupOTP(user).subscribe(
          (response) => {
            if (response.status === 200) {
              console.log(response, '-----------200-------response')
              this.toast.success(response.message);
              this.router.navigate(['/login']);
            } else {
              console.log(response, '-----------500-------response')
              this.toast.error(response.message);
            }
          },
          (error) => {
            console.log('---------error---------response')
            this.toast.error(error);
          },
          () => {
            this.loading = false;
          }
        );
      } catch (error) {
        console.error(error);
      }
    } else {
      this.toast.error('Passwords do not match');
    }
  }
}
