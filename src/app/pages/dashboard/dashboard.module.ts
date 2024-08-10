import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ModalModule } from '../../shared/components/modal/modal.module';
import { BasicDataTableModule } from '../../shared/components/basic-data-table/basic-data-table.module';
import { MatDialogModule } from '@angular/material/dialog';
import { AgencyDataComponent } from './components/agency-data/agency-data.component';
import { ModalExportChoiceComponent } from 'src/app/shared/components/modal-export-choice/modal-export-choice.component';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [DashboardComponent, AgencyDataComponent],
  providers: [LocalStorageService],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    BasicDataTableModule,
    ModalModule,
    MatDialogModule,
    ModalExportChoiceComponent,
    HttpClientModule,
    MatSelectModule,
  ],
})
export class DashboardModule {}
