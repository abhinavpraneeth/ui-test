import { TestBed } from '@angular/core/testing';
import { DashboardService, PokemonListDto } from './dashboard.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

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

  it('should return expected pokemon list (HttpClient called once)', (done: DoneFn) => {
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
});
