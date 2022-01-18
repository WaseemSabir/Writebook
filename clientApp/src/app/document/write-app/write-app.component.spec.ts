import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteAppComponent } from './write-app.component';

describe('WriteAppComponent', () => {
  let component: WriteAppComponent;
  let fixture: ComponentFixture<WriteAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WriteAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
