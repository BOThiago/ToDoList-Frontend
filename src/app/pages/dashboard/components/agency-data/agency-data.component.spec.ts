import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyDataComponent } from './agency-data.component';

describe('AgencyDataComponent', () => {
  let component: AgencyDataComponent;
  let fixture: ComponentFixture<AgencyDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgencyDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgencyDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
