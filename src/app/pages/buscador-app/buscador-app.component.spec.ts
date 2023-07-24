import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorAppComponent } from './buscador-app.component';

describe('BuscadorAppComponent', () => {
  let component: BuscadorAppComponent;
  let fixture: ComponentFixture<BuscadorAppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuscadorAppComponent]
    });
    fixture = TestBed.createComponent(BuscadorAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
