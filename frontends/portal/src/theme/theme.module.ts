import {NgModule} from "@angular/core";

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
  declarations: [],
  imports: [],
  exports: [],
})
export class ThemeModule {
  static forRoot() {
    return {
      ngModule: ThemeModule,
      providers: [],
    };
  }
}
