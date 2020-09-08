import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterpeerComponent } from './registerpeer.component';

describe('RegisterpeerComponent', () => {
  let component: RegisterpeerComponent;
  let fixture: ComponentFixture<RegisterpeerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterpeerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterpeerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
