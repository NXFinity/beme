import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnInit } from '@angular/core';
import { SettingsService } from "../theme/services/settings.service";
import { AuthService } from '../core/security/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <div id="app" class="app" [ngClass]="{
        'd-none': !appLoaded,
        'app-without-header': settingsService.appHeaderNone,
        'app-without-sidebar': settingsService.appSidebarNone,
        'app-with-top-nav': settingsService.appTopNav,
        'app-boxed-layout': settingsService.appBoxedLayout,
        'app-sidebar-collapsed': settingsService.appSidebarCollapsed,
        'app-content-full-height': settingsService.appContentFullHeight,
        'app-content-full-width': settingsService.appContentFullWidth,
        'app-footer-fixed': settingsService.appFooter
}">

      <header *ngIf="!settingsService.appHeaderNone"></header>

      <top-nav *ngIf="settingsService.appTopNav"></top-nav>

      <sidebar *ngIf="!settingsService.appSidebarNone"></sidebar>

      <sidebar-mobile-backdrop *ngIf="!settingsService.appSidebarNone"></sidebar-mobile-backdrop>

      <div id="content" class="app-content" [class]="settingsService.appContentClass">
        <router-outlet></router-outlet>
      </div>

      <footer *ngIf="settingsService.appFooter"></footer>

<!--      <theme-panel></theme-panel>-->
    </div>
  `,
})
export class AppComponent implements OnInit, AfterViewInit {
  appEvent = new EventEmitter<string>();
  appLoaded: boolean = false;
  isAuthenticated$: boolean;


  constructor(public settingsService: SettingsService,
              public authService: AuthService,
              private cdr: ChangeDetectorRef) {
    this.isAuthenticated$ = this.authService.isAuthenticated();
  }

  handleSetCover(coverClass: string) {
    const htmlElm = document.querySelector('html');
    if (htmlElm) {
      for (var x = 0; x < document.documentElement.classList.length; x++) {
        var targetClass = document.documentElement.classList[x];
        if (targetClass.search('bg-cover-') > -1) {
          htmlElm.classList.remove(targetClass);
        }
      }
      htmlElm.classList.add(coverClass);
    }
  }

  handleSetMode(mode: string) {
    document.documentElement.setAttribute('data-bs-theme', mode);
    this.appEvent.emit('theme-reload');
  }

  handleSetTheme(themeClass: string) {
    for (let x = 0; x < document.body.classList.length; x++) {
      const targetClass = document.body.classList[x];
      if (targetClass.search('theme-') > -1) {
        document.body.classList.remove(targetClass);
      }
    }
    document.body.classList.add(themeClass);
    this.appEvent.emit('theme-reload');
  }

  ngOnInit() {
    const elm = document.body;
    if (elm) {
      elm.classList.add('app-init');
    }

    if (this.settingsService.appMode) {
      this.handleSetMode(this.settingsService.appMode);
    }
    if (this.settingsService.appTheme) {
      this.handleSetTheme(this.settingsService.appTheme);
    }
    if (this.settingsService.appCover) {
      this.handleSetCover(this.settingsService.appCover);
    }
  }

  ngAfterViewInit() {
    this.appLoaded = true;
  }
}
