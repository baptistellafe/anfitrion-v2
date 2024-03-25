import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrimeiroAcessoPage } from './primeiro-acesso.page';

describe('PrimeiroAcessoPage', () => {
  let component: PrimeiroAcessoPage;
  let fixture: ComponentFixture<PrimeiroAcessoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PrimeiroAcessoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
