import { Injectable } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private previousUrl: string | null = null;
  private currentUrl: string | null = null;

  constructor(private router: Router) {
    // Set initial current URL
    this.currentUrl = this.router.url;

    // Subscribe to router events to track URL changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationStart || event instanceof NavigationEnd))
      .subscribe((event: Event) => {
        if (event instanceof NavigationStart) {
          // Before the navigation starts, set the previous URL
          this.previousUrl = this.currentUrl;
          this.currentUrl = event.url;
        } else if (event instanceof NavigationEnd) {
          // After the navigation ends, update the current URL
          this.currentUrl = event.urlAfterRedirects;
        }
      });
  }

  public getPreviousUrl(): string | null {
    return this.previousUrl;
  }

  public getCurrentUrl(): string | null {
    return this.currentUrl;
  }
}
