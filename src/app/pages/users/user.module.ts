import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { BasicDataTableModule } from 'src/app/shared/components/basic-data-table/basic-data-table.module';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, UserRoutingModule, BasicDataTableModule, FormsModule],
  declarations: [UserComponent],
})
export class UserModule {}
