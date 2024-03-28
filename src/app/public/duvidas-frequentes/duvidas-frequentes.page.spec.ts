import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DuvidasFrequentesPage } from './duvidas-frequentes.page';

describe('DuvidasFrequentesPage', () => {
  let component: DuvidasFrequentesPage;
  let fixture: ComponentFixture<DuvidasFrequentesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DuvidasFrequentesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
