import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyresetcodeComponent } from './verifyresetcode.component';

describe('VerifyresetcodeComponent', () => {
  let component: VerifyresetcodeComponent;
  let fixture: ComponentFixture<VerifyresetcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyresetcodeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerifyresetcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
