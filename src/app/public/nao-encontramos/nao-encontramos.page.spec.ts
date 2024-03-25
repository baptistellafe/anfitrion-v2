import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NaoEncontramosPage } from './nao-encontramos.page';

describe('NaoEncontramosPage', () => {
  let component: NaoEncontramosPage;
  let fixture: ComponentFixture<NaoEncontramosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NaoEncontramosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
