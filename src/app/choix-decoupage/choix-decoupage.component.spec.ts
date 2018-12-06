import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoixDecoupageComponent } from './choix-decoupage.component';

describe('ChoixDecoupageComponent', () => {
  let component: ChoixDecoupageComponent;
  let fixture: ComponentFixture<ChoixDecoupageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoixDecoupageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoixDecoupageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
