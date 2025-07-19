import { Component, inject, signal, computed } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule, MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth';

interface LoginFormData {
  email: string;
  password: string;
  gate: string;
}

interface FormValidation {
  email: {
    required: boolean;
    email: boolean;
  };
  password: {
    required: boolean;
  };
  gate: {
    required: boolean;
  };
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSelectModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  // Form data signals
  readonly formData = signal<LoginFormData>({
    email: 'test@test.com',
    password: 'test',
    gate: 'A64'
  });

  // Gate options
  readonly gateOptions = ['A64', 'C33', 'H11'];

  // UI state signals
  readonly hidePassword = signal(true);
  readonly loginInvalid = signal(false);
  readonly isLoading = signal(false);

  // Computed validation signals
  readonly validation = computed<FormValidation>(() => {
    const data = this.formData();
    const email = data.email;
    const password = data.password;

    return {
      email: {
        required: !email || email.trim() === '',
        email: email ? !this.isValidEmail(email) : false
      },
      password: {
        required: !password || password.trim() === ''
      },
      gate: {
        required: !data.gate || data.gate.trim() === ''
      }
    };
  });

  // Computed form validity
  readonly isFormValid = computed(() => {
    const validation = this.validation();
    return !validation.email.required && 
           !validation.email.email && 
           !validation.password.required &&
           !validation.gate.required;
  });

  // Computed error states
  readonly emailErrors = computed(() => {
    const validation = this.validation();
    return {
      required: validation.email.required,
      email: validation.email.email
    };
  });

  readonly passwordErrors = computed(() => {
    const validation = this.validation();
    return {
      required: validation.password.required
    };
  });

  readonly gateErrors = computed(() => {
    const validation = this.validation();
    return {
      required: validation.gate.required
    };
  });

  // Event handlers
  onEmailChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.formData.update(data => ({
      ...data,
      email: target.value
    }));
  }

  onPasswordChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.formData.update(data => ({
      ...data,
      password: target.value
    }));
  }

  onGateChange(event: MatSelectChange): void {
    this.formData.update(data => ({
      ...data,
      gate: event.value
    }));
  }

  togglePasswordVisibility(event: Event): void {
    event.stopPropagation();
    this.hidePassword.update(hide => !hide);
  }

  onSubmit(): void {
    this.loginInvalid.set(false);
    
    if (!this.isFormValid()) {
      return;
    }

    console.log('Form is valid, attempting login...');
    this.isLoading.set(true);
    const { email, password, gate } = this.formData();
    console.log('Login credentials:', { email, password, gate });

    this.authService.login(email, password, gate).subscribe({
      next: (isAuthenticated: boolean) => {
        this.isLoading.set(false);
        if (isAuthenticated) {
          this.router.navigate(['/new-announcement']);
        } else {
          this.loginInvalid.set(true);
        }
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
        this.loginInvalid.set(true);
      },
    });
  }

  // Helper method for email validation
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
