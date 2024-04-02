import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PontosTuristicosPage } from './pontos-turisticos.page';

describe('PontosTuristicosPage', () => {
  let component: PontosTuristicosPage;
  let fixture: ComponentFixture<PontosTuristicosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PontosTuristicosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
