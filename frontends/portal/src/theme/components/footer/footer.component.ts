import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  host: {
    class: 'app-footer',
  },
})
export class FooterComponent implements OnInit {
  year = new Date().getFullYear();

  constructor(private settingsService: SettingsService) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.settingsService.appSidebarNone = false;
  }
}
