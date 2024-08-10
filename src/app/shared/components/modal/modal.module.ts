import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { ModalComponent } from './modal.component';

registerLocaleData(localePt);
@NgModule({
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-PT',
    },
  ],
  declarations: [ModalComponent],
  exports: [ModalComponent],
  imports: [CommonModule],
})
export class ModalModule {}
