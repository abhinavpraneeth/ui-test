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
});
