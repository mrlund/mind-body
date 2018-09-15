import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import * as fromServices from "./services";
import * as fromGuards from "./guards";
import { TokenInterceptorService } from "./services/token-interceptor.service";

import * as fromDirectives from './directives';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [...fromDirectives.D3_DIRECTIVES],
  providers: [
    ...fromGuards.guards,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error(
        `CoreModule has already been loaded. Import Core modules in the AppModule only.`
      );
    }
  }

}
