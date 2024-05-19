import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularPracticeComponent } from './angular-practice.component';
import { CommonModule, NgFor } from '@angular/common';

describe('AngularPracticeComponent', () => {
  let component: AngularPracticeComponent;
  let fixture: ComponentFixture<AngularPracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularPracticeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AngularPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
