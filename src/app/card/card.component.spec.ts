import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have card element', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.card')).toBeTruthy();
  });

  it('should have header element', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.header')).toBeTruthy();
  });
  it('should have image thumbnail element', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.thumbnail')).toBeTruthy();
  });

  it('should have title element', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.title')).toBeTruthy();
  });

  it('should have height element', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.height')).toBeTruthy();
  });

  it('should have weight element', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.weight')).toBeTruthy();
  });
  it('should have abilities element', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.abilities-title')).toBeTruthy();
    expect(compiled.querySelector('.abilities')).toBeTruthy();
  });
});
