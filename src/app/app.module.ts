import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HotToastModule } from '@ngneat/hot-toast';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { InputComponent } from './components/input/input.component';
import { BackgroundComponent } from './components/background/background.component';
import { TestingPageComponent } from './pages/testing-page/testing-page.component';
import { LoginComponent } from './partials/login/login.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupComponent } from './partials/signup/signup.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { SignupOTPComponent } from './partials/signup-otp/signup-otp.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './partials/header/header.component';
import { FooterComponent } from './partials/footer/footer.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { SectionCardComponent } from './components/section-card/section-card.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { SingleBookPageComponent } from './pages/single-book-page/single-book-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { TokenInterceptor } from './services/interceptor/interceptor.service';
import { CartCardComponent } from './components/cart-card/cart-card.component';
import { ErrorHandlerService } from './services/interceptor/error-handling.service';
import { TruncateTextDirective } from './directives/truncate-text.directive';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    BackgroundComponent,
    TestingPageComponent,
    LoginComponent,
    LoginPageComponent,
    SignupComponent,
    RegisterPageComponent,
    SignupOTPComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    ProductCardComponent,
    SectionCardComponent,
    CategoryPageComponent,
    SingleBookPageComponent,
    CartPageComponent,
    CartCardComponent,
    TruncateTextDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HotToastModule.forRoot(),
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
