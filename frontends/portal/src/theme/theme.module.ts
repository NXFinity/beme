import {NgModule} from "@angular/core";

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
