import { Component, signal, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    RouterModule
  ],
  templateUrl: './setup.html',
  styleUrl: './setup.css',
})
export class SetupComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  // Tab labels with routes
  readonly tabs = [
    { label: 'TEMPLATES', icon: 'description', route: 'templates' },
    { label: 'VARIABLES', icon: 'code', route: 'variables' },
    { label: 'SETTINGS', icon: 'settings', route: 'settings' },
    { label: 'USERS', icon: 'people', route: 'users' }
  ];

  ngOnInit() {
    // If we're at /setup without a child route, redirect to templates
    if (this.router.url === '/setup') {
      this.router.navigate(['/setup/templates']);
    }
  }

  // Event handlers
  onTabChange(event: any): void {
    const selectedTab = this.tabs[event.index];
    this.router.navigate(['/setup', selectedTab.route]);
  }

  // Get current tab index based on route
  getCurrentTabIndex(): number {
    const currentUrl = this.router.url;
    const tabIndex = this.tabs.findIndex(tab => 
      currentUrl.includes(tab.route)
    );
    return tabIndex >= 0 ? tabIndex : 0;
  }
} 