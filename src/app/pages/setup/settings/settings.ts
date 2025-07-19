import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class SettingsComponent {
  // Komponenta za settings
} 