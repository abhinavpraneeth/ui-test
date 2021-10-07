import { TestBed } from '@angular/core/testing';
import {
  DashboardService,
  PokemonDetail,
  PokemonListDto,
} from './dashboard.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('DashboardService', () => {
  let dashboardService: DashboardService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    dashboardService = new DashboardService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(dashboardService).toBeTruthy();
  });

  it('should return expected pokemons list (HttpClient called once)', (done: DoneFn) => {
    const expectedResponse: PokemonListDto = {
      count: 0,
      next: '',
      previous: '',
      results: [],
    };

    httpClientSpy.get.and.returnValue(of(expectedResponse));

    dashboardService.getPokemonList().subscribe((response) => {
      expect(response).toEqual(expectedResponse);
      done();
    }, done.fail);
    expect(httpClientSpy.get.calls.count()).toBe(1);
  });

  it('should return pokemon detail', (done: DoneFn) => {
    const expectedResponse: PokemonDetail = {
      height: 10,
      weight: 10,
      id: 1,
      abilities: [],
      listOfAbilities: [],
      sprites: {} as any,
    };
    httpClientSpy.get.and.returnValue(of(expectedResponse));
    dashboardService.getPokemon('').subscribe((response) => {
      expect(response).toEqual(expectedResponse);
      done();
    }, done.fail);
    expect(httpClientSpy.get.calls.count()).toBe(1);
  });
});
