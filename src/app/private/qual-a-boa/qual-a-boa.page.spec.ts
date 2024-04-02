import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QualABoaPage } from './qual-a-boa.page';

describe('QualABoaPage', () => {
  let component: QualABoaPage;
  let fixture: ComponentFixture<QualABoaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(QualABoaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
