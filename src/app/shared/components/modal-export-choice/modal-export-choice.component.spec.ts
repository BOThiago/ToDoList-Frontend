import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExportChoiceComponent } from './modal-export-choice.component';

describe('ModalExportChoiceComponent', () => {
  let component: ModalExportChoiceComponent;
  let fixture: ComponentFixture<ModalExportChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalExportChoiceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalExportChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
