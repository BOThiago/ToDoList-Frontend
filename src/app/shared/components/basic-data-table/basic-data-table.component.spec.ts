import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicDataTableComponent } from './basic-data-table.component';

describe('BasicDataTableComponent', () => {
  let component: BasicDataTableComponent;
  let fixture: ComponentFixture<BasicDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicDataTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BasicDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
