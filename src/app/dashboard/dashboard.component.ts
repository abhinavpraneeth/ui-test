import { Component, OnInit } from '@angular/core';
import { CARDS_PER_PAGE, DashboardService, Pokemon } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  pokemons: Pokemon[] = [];
  cardsPerPage = CARDS_PER_PAGE;
  displayCardCount = this.cardsPerPage[0];
  offset = 0;
  previous = '';
  next = '';

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    const url = this.dashboardService.generatePokemonListUrl(
      this.displayCardCount,
      this.offset
    );
    this.loadPokemons(url);
  }

  loadPokemons(url: string): void {
    this.dashboardService.getPokemonList(url).subscribe((data) => {
      this.pokemons = data.results;
      this.next = data.next;
      this.previous = data.previous;
      // TODO calculate new offset
    });
  }

  onChangeDisplayCount({ target }: any): void {
    // TODO: store count
    const url = this.dashboardService.generatePokemonListUrl(
      target.value,
      this.offset
    );
    this.loadPokemons(url);
  }

  onClickPrevious(): void {
    if (this.previous) this.loadPokemons(this.previous);
  }

  onClickNext(): void {
    if (this.next) this.loadPokemons(this.next);
  }
}
