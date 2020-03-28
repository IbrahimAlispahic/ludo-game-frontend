import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameActiveComponent } from './game-active.component';

describe('GameActiveComponent', () => {
  let component: GameActiveComponent;
  let fixture: ComponentFixture<GameActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
