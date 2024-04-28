import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  public appMode: string = 'dark';
  public appTheme: string = 'theme-pink';
  public appCover: string = '';

  public appBoxedLayout: boolean = false;
  public appHeaderNone: boolean = false;
  public appTopNav: boolean = false;
  public appFooter: boolean = true;

  public appSidebarNone: boolean = false;
  public appSidebarCollapsed: boolean = true;

  public appContentClass: string = '';
  public appContentFullHeight: boolean = false;
  public appContentFullWidth: boolean = false;
}
