import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MndlGaemComponent } from './mndl-gaem.component';

describe('MndlGaemComponent', () => {
  let component: MndlGaemComponent;
  let fixture: ComponentFixture<MndlGaemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MndlGaemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MndlGaemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
