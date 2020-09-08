import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectpeerComponent } from './selectpeer.component';

describe('SelectpeerComponent', () => {
  let component: SelectpeerComponent;
  let fixture: ComponentFixture<SelectpeerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectpeerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectpeerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
