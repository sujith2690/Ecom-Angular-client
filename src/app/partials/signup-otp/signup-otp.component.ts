import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-signup-otp',
  templateUrl: './signup-otp.component.html',
  styleUrls: ['./signup-otp.component.css'],
})
export class SignupOTPComponent {
  @Output() verifyOTP = new EventEmitter<void>();

  ContinueFromOTP() {
    this.verifyOTP.emit();
  }
}
