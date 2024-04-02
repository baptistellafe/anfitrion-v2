import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrocarCidadePage } from './trocar-cidade.page';

describe('TrocarCidadePage', () => {
  let component: TrocarCidadePage;
  let fixture: ComponentFixture<TrocarCidadePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TrocarCidadePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
