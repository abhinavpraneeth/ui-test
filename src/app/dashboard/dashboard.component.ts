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

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadPokemons(this.displayCardCount);
  }

  loadPokemons(count: number): void {
    this.dashboardService.getPokemonList(count, 0).subscribe((data) => {
      this.pokemons = data.results;
    });
  }

  onChangeDisplayCount({ target }: any): void {
    this.loadPokemons(target.value);
  }
}
