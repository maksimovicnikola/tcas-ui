import { Injectable, signal } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = signal<boolean>(false);

  login(email: string, password: string): Observable<boolean> {
    const areCredentialsValid =
      email === 'test@test' && password === 'test';

    return of(areCredentialsValid).pipe(
      delay(500), // Simulate network latency
      tap((isAuthenticated) => {
        if (isAuthenticated) {
          this.isAuthenticated.set(true);
        }
      })
    );
  }

  logout(): void {
    this.isAuthenticated.set(false);
  }
}
