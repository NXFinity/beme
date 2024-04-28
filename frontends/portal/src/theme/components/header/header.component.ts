import { Component } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { AuthService } from '../../../core/services/auth.service';
import { VariablesService } from '../../services/variables.service';

declare var slideToggle: any;

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  host: {
    class: 'app-header',
  },
})
export class HeaderComponent {
  appVariables = this.variablesService.getAppVariables();

  modeList = [
    { name: 'Dark', img: '/assets/img/mode/dark.jpg', value: 'dark' },
    { name: 'Light', img: '/assets/img/mode/light.jpg', value: 'light' },
  ];

  constructor(
    public settingsService: SettingsService,
    public authService: AuthService,
    private variablesService: VariablesService,
  ) {}

  toggleThemeMode(): void {
    // Determine the new mode based on the current mode
    const newMode = this.isDarkMode() ? 'light' : 'dark';

    // Call handleSetMode with the new mode
    this.handleSetMode(newMode);
  }

  isDarkMode(): boolean {
    // Assuming your settingsService has a method to get the current mode
    return this.settingsService.appMode === 'dark';
  }

  handleToggleSidebarCollapsed(event: MouseEvent) {
    event.preventDefault();

    if (!this.settingsService.appSidebarNone) {
      var elm = document.getElementById('app');
      if (elm) {
        elm.classList.toggle('app-sidebar-collapsed');
      }
    }
  }

  handleToggleMobileSidebar(event: MouseEvent) {
    event.preventDefault();

    if (
      !(this.settingsService.appSidebarNone && this.settingsService.appTopNav)
    ) {
      var elm = document.getElementById('app');
      if (elm) {
        elm.classList.toggle('app-sidebar-mobile-toggled');
      }
    } else {
      slideToggle(document.querySelector('.app-top-nav'));
      window.scrollTo(0, 0);
    }
  }

  handleAppToggleClass(event: MouseEvent, className: string) {
    event.preventDefault();

    var elm = document.getElementById('app');
    if (elm) {
      elm.classList.toggle(className);
    }
  }

  handleSetMode(mode: string) {
    this.settingsService.appMode = mode;
    if (localStorage) {
      localStorage['appMode'] = mode;
    }

    document.documentElement.setAttribute('data-bs-theme', mode);
    this.appVariables = this.variablesService.getAppVariables();
    this.variablesService.variablesReload.emit();
  }
}
