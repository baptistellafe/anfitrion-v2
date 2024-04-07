import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarDadosPage } from './editar-dados.page';

describe('EditarDadosPage', () => {
  let component: EditarDadosPage;
  let fixture: ComponentFixture<EditarDadosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditarDadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
