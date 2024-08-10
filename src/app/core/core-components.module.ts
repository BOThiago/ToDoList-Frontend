import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ModalModule } from '../shared/components/modal/modal.module';

@NgModule({
  imports: [RouterOutlet, CommonModule, MatIconModule, ModalModule],
  declarations: [LoadingComponent, HeaderComponent],
  exports: [LoadingComponent, HeaderComponent],
})
export class CoreComponentsModule {}
