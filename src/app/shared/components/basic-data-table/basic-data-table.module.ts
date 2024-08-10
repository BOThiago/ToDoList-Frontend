import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { BasicDataTableComponent } from './basic-data-table.component';
import localePt from '@angular/common/locales/pt';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ModalModule } from '../modal/modal.module';
import { ToggleSwitchModule } from '../toggle-switch/toggle-switch.module';
import { ModalExportChoiceComponent } from '../modal-export-choice/modal-export-choice.component';
import { TaskComponent } from 'src/app/pages/tasks/task.component';
import { UserComponent } from 'src/app/pages/users/user.component';

registerLocaleData(localePt);
@NgModule({
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-PT',
    },
    TaskComponent,
    UserComponent,
  ],
  declarations: [BasicDataTableComponent],
  exports: [BasicDataTableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatTableExporterModule,
    ModalModule,
    ToggleSwitchModule,
    ModalExportChoiceComponent,
  ],
})
export class BasicDataTableModule {}
