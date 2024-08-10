import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task.component';
import { BasicDataTableModule } from 'src/app/shared/components/basic-data-table/basic-data-table.module';
import { TaskRoutingModule } from './task-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, TaskRoutingModule, BasicDataTableModule, FormsModule],
  declarations: [TaskComponent],
})
export class TaskModule {}
