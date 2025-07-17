import { Component, inject } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  loginForm: FormGroup;
  hidePassword = true;
  loginInvalid = false;
  isLoading = false;

  constructor() {
    this.loginForm = this.fb.group({
      email: ['test@test', [Validators.required, Validators.email]],
      password: ['test', [Validators.required]],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  togglePasswordVisibility(event: Event): void {
    event.stopPropagation();
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    this.loginInvalid = false;
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    const { email, password } = this.loginForm.value;

    this.authService.login(email!, password!).subscribe({
      next: (isAuthenticated: boolean) => {
        this.isLoading = false;
        if (isAuthenticated) {
          this.router.navigate(['/new-announcement']);
        } else {
          this.loginInvalid = true;
        }
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.loginInvalid = true;
      },
    });
  }
}
