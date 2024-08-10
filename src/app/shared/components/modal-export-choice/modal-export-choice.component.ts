import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-export-choice',
  standalone: true,
  imports: [],
  templateUrl: './modal-export-choice.component.html',
  styleUrl: './modal-export-choice.component.scss',
})
export class ModalExportChoiceComponent {
  @Output() onClickExport = new EventEmitter<'pdf' | 'csv' | 'xls'>();
  constructor(private dialogRef: MatDialogRef<ModalExportChoiceComponent>) {}

  export(value: 'pdf' | 'csv' | 'xls') {
    this.dialogRef.close(value);
  }
}
