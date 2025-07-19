import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class FooterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  
  currentYear = new Date().getFullYear();

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
