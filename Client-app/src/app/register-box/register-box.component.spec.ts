import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterBoxComponent } from './register-box.component';

describe('RegisterBoxComponent', () => {
  let component: RegisterBoxComponent;
  let fixture: ComponentFixture<RegisterBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
