import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';

import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let getPokemonListSpy: any;

  beforeEach(async () => {
    const pokemons = {};
    const dashboardService = jasmine.createSpyObj('DashboardService', [
      'getPokemonList',
    ]);
    getPokemonListSpy = dashboardService.getPokemonList.and.returnValue(
      of(pokemons)
    );

    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: DashboardService, useValue: dashboardService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should have cards', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.cards')).toBeTruthy();
  });

  it('should call getPokemonList', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(getPokemonListSpy.calls.any()).toBe(true);
  });

  describe('DashboardComponent: display count feature', () => {
    it('should have page-actions', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('.page-actions')).toBeTruthy();
    });

    it('should define cardsPerPage', () => {
      fixture.detectChanges();
      expect(component.cardsPerPage).toBeTruthy();
    });

    it('should define cardsPerPage as [10, 20, 50]', () => {
      fixture.detectChanges();
      expect(component.cardsPerPage).toEqual([10, 20, 50]);
    });

    it('should default display count to 10 cardsPerPage', () => {
      fixture.detectChanges();
      expect(component.displayCardCount).toEqual(10);
    });
    it('should call getPokemonList with 10', () => {
      fixture.detectChanges();
      expect(getPokemonListSpy).toHaveBeenCalledWith(10, 0);
    });
    it('should define onChangeDisplayCount', () => {
      fixture.detectChanges();
      expect(component.onChangeDisplayCount).toBeDefined();
    });
    it('should call getPokemonList on onChangeDisplayCount', () => {
      const count = 20;
      fixture.detectChanges();
      component.onChangeDisplayCount({ target: { value: count } });
      expect(getPokemonListSpy.calls.any()).toBe(true);
      expect(getPokemonListSpy).toHaveBeenCalledWith(count, 0);
    });
  });
});
