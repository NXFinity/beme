import { Injectable } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/common/interfaces/user.interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private userService: UserService) {}

  getAppMenus() {
    return this.userService.getProfile().pipe(
      map(user => [
        { text: 'CONSOLES', is_header: true },
        { path: `/${user.username}/analytics`, icon: 'bi bi-bar-chart', text: 'Analytics' },
        { text: 'SETTINGS', is_header: true },
        { path: `/${user.username}/settings`, icon: 'bi bi-person-gear', text: 'Account' },
        { path: `/${user.username}/settings/stream`, icon: 'bi bi-person-gear', text: 'Stream' },
        { path: `/${user.username}/settings/security`, icon: 'bi bi-shield-lock', text: 'Security' },
        { text: 'INFORMATION', is_header: true },
        { 'icon': 'fa-solid fa-scale-balanced', 'text': 'Legal', 'children': [
            { 'path': '/legal/terms', 'action': 'Inbox', 'text': 'Terms' },
            { 'path': '/legal/privacy', 'action': 'Compose', 'text': 'Privacy' },
            { 'path': '/legal/cookies', 'action': 'Detail', 'text': 'Cookies' },
            { 'path': '/legal/copyright', 'action': 'Detail', 'text': 'Copyright' }
          ]
        },
        { 'icon': 'bi bi-book', 'text': 'Guides', 'children': [
            { 'path': '/legal/terms', 'action': 'Inbox', 'text': 'How To' },
          ]
        },
      ])
    );
  }

  getStreamMenu() {
    return [
      { text: 'TOOLS', is_header: true },
      { 'icon': 'bi bi-person-workspace', 'text': 'Streaming', 'children': [
          { 'path': '/legal/terms', 'action': 'Inbox', 'text': 'Alerts' },
        ]
      },
    ];
  }

  getAdminMenu() {
    return [{ text: 'ADMINISTRATION', is_header: true }];
  }
}
