import {NgModule} from "@angular/core";
import { TopNavComponent } from "./components/top-nav/top-nav.component";
import { HeaderComponent } from "./components/header/header.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { SidebarMobileBackdropComponent } from "./components/sidebar-mobile-backdrop/sidebar-mobile-backdrop.component";
import { FooterComponent } from './components/footer/footer.component';
import { ThemePanelComponent } from './components/theme-panel/theme-panel.component';
import { NavScrollComponent } from './components/nav-scroll/nav-scroll.component';
import {
  CardBodyComponent,
  CardComponent, CardExpandTogglerComponent,
  CardFooterComponent, CardGroupComponent,
  CardHeaderComponent, CardImgOverlayComponent
} from './components/card/card.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { AppsComponent } from './components/apps/apps.component';
import { UserComponent } from './components/user/user.component';
import { ChatComponent } from "./components/chat/chat.component";
import { GuestComponent } from './components/guest/guest.component';
import { VoiceComponent } from "./components/voice/voice.component";
import { PlayerTwoComponent } from './components/video/player-two/player-two.component';
import { MaterialModule } from './modules/material/material.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgxMasonryModule } from 'ngx-masonry';
import { NgbDatepickerModule, NgbTimepickerModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { NgChartsModule } from 'ng2-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgSelectModule } from '@ng-select/ng-select';
import { HighlightModule } from 'ngx-highlightjs';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ColorSketchModule } from 'ngx-color/sketch';
import { CountdownModule } from 'ngx-countdown';
import { TagInputModule } from 'ngx-chips';
import { TitleService } from './services/title.service';
import { MenuService } from './services/menu.service';
import { SidebarService } from './services/sidebar.service';
import { SharedModule } from '../shared/shared.module';

const themeComponents = [
  HeaderComponent,
  TopNavComponent,
  SidebarComponent,
  SidebarMobileBackdropComponent,
  FooterComponent,
  ThemePanelComponent,
  NavScrollComponent,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  CardFooterComponent,
  CardImgOverlayComponent,
  CardGroupComponent,
  CardExpandTogglerComponent,
  NotificationsComponent,
  AppsComponent,
  UserComponent,
  GuestComponent,
  ChatComponent,
  VoiceComponent,
  PlayerTwoComponent,
];
const themeModules = [
  MaterialModule,
  NgScrollbarModule,
  NgxMasonryModule,
  NgbDatepickerModule,
  NgbTimepickerModule,
  NgbTypeaheadModule,
  NgxMaskDirective,
  NgxMaskPipe,
  NgSelectModule,
  NgChartsModule,
  NgApexchartsModule,
  HighlightModule,
  FullCalendarModule,
  ColorSketchModule,
  CountdownModule,
  TagInputModule,
];
const themeServices = [TitleService, MenuService, SidebarService];
@NgModule({
  declarations: [...themeComponents],
  imports: [SharedModule, ...themeModules],
  exports: [SharedModule, ...themeComponents],
})
export class ThemeModule {
  static forRoot() {
    return {
      ngModule: ThemeModule,
      providers: [...themeServices],
    };
  }
}
