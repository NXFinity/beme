import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';
import { SettingsService } from '../../services/settings.service';
import { VariablesService } from '../../services/variables.service';
import { User } from '../../../core/common/interfaces/user.interface';

@Component({
  selector: 'beam-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  user!: User;
  appVariables = this.variablesService.getAppVariables();

  modeList = [
    { name: 'Dark', img: '/assets/img/mode/dark.jpg', value: 'dark' },
    { name: 'Light', img: '/assets/img/mode/light.jpg', value: 'light' },
  ];
  constructor(
    private userService: UserService,
    public authService: AuthService,
    private variablesService: VariablesService,
    public settingsService: SettingsService,
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

  ngOnInit() {
    this.userService.getProfile().subscribe((user: User) => {
      this.user = user;
    });
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
