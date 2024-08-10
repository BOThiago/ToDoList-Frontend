import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { ToggleSwitchComponent } from './toggle-switch.component';

registerLocaleData(localePt);
@NgModule({
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-PT',
    },
  ],
  declarations: [ToggleSwitchComponent],
  exports: [ToggleSwitchComponent],
  imports: [CommonModule],
})
export class ToggleSwitchModule {}
