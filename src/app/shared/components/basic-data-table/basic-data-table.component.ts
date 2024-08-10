import { formatDate } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableExporterDirective } from 'mat-table-exporter';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MatDialog } from '@angular/material/dialog';
import { ModalExportChoiceComponent } from '../modal-export-choice/modal-export-choice.component';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';
import { TaskComponent } from 'src/app/pages/tasks/task.component';
import { UserComponent } from '../../../pages/users/user.component';

@Component({
  selector: 'app-basic-data-table',
  templateUrl: './basic-data-table.component.html',
  styleUrl: './basic-data-table.component.scss',
})
export class BasicDataTableComponent implements OnInit, OnChanges {
  @ViewChild('tableView', { static: false }) tableView?: ElementRef;
  @ViewChild('filterModal') filterModal!: TemplateRef<any>;
  @ViewChild('exportModal') exportModal!: TemplateRef<any>;
  @ViewChild('exporter') exporter!: MatTableExporterDirective;
  formatDate = formatDate;

  @Input() fileName: string = 'tabela';
  @Input() columns!: Column[];
  @Input() data: any[] = [];
  @Input() choice: any;
  @Input() showExportButton: boolean = true;
  @Input() showFilterButton: boolean = true;
  @Input() userList: any[] = [];

  modalContentTemplate!: TemplateRef<any>;
  isModalOpen: boolean = false;

  protected showExportSubmodal = false;
  protected dataSource!: MatTableDataSource<any>;
  static timeoutSeconds: number = 10;
  private timeoutExpired: boolean = false;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private taskService: TaskService,
    private userService: UserService,
    private userComponent: UserComponent,
    private taskComponet: TaskComponent
  ) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.data);
    this.startTimeout();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['data'] &&
      changes['data'].currentValue &&
      changes['data'].currentValue != changes['data'].previousValue
    ) {
      this.dataSource = new MatTableDataSource(this.data);
      this.startTimeout();
    }
  }

  get dataLoadingType(): 'loading' | 'completed' {
    if ((this.data && this.data.length > 0) || this.timeoutExpired) {
      return 'completed';
    } else {
      return 'loading';
    }
  }

  get headerValues(): string[] {
    return (
      this.columns?.filter((e) => e.visible !== false).map((e) => e.value) ?? []
    );
  }

  startTimeout() {
    if (this.data && this.data.length == 0) {
      setTimeout(() => {
        if (!this.data || this.data.length == 0) {
          this.timeoutExpired = true;
        }
      }, BasicDataTableComponent.timeoutSeconds * 1000);
    }
  }

  openModal(contentTemplate: TemplateRef<any>) {
    this.modalContentTemplate = contentTemplate;
    this.isModalOpen = true;
  }

  openExportModal() {
    this.dialog
      .open(ModalExportChoiceComponent, {
        width: '70vw',
        maxWidth: '700px',
      })
      .afterClosed()
      .subscribe((result?: 'pdf' | 'csv' | 'xls') => {
        if (result) {
          if (result == 'pdf') {
            this.exportToPdf();
          } else {
            this.exporter.exportTable(result, { fileName: this.fileName });
          }
        }
      });
  }

  closeModal() {
    this.isModalOpen = false;
  }

  exportToPdf() {
    const data =
      this.tableView?.nativeElement ?? document.getElementById('table-view');
    if (data) {
      html2canvas(data).then((canvas) => {
        const imgWidth = 208;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const contentDataURL = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save(this.fileName + '.pdf');
      });
    }
  }

  deleteChoice(id: string) {
    if (this.router.url.includes('tasks')) {
      this.taskService
        .deleteTask(id)
        .subscribe(() => this.taskComponet.loadTasks());
    } else if (this.router.url.includes('users')) {
      this.userService
        .deleteUser(id)
        .subscribe(() => this.userComponent.loadUsers());
    }
  }

  filterTasksByStatus(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    if (this.router.url.includes('tasks')) {
      this.taskComponet.filterTasksByStatus(selectedValue);
    }
  }

  filterTasksByDueDate(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    if (this.router.url.includes('tasks')) {
      this.taskComponet.sortTasksByDueDate(selectedValue);
    }
  }

  filterByUser(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    if (this.router.url.includes('tasks')) {
      this.taskComponet.filterByUser(selectedValue);
    }
  }

  editChoice(id: string, choice: any) {
    if (this.router.url.includes('tasks')) {
      this.taskService
        .updateTask(id, choice)
        .subscribe(() => this.taskComponet.loadTasks());
    } else if (this.router.url.includes('users')) {
      this.userService
        .updateUser(id, choice)
        .subscribe(() => this.userComponent.loadUsers());
    }
  }

  partitionArray(array: any[], size: number): any[][] {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
}

export interface Column {
  label?: string;
  value: string;
  type?: 'regular' | 'date' | 'time' | 'actions' | 'switch' | 'user';
  prefix?: string;
  sulfix?: string;
  visible?: boolean;
}
