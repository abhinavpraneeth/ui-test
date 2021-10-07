import { Component, Input, OnInit } from '@angular/core';
import {
  DashboardService,
  Pokemon,
  PokemonDetail,
} from '../dashboard/dashboard.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() pokemon: Pokemon | undefined;
  pokemonDetail: PokemonDetail | undefined;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    if (this.pokemon && this.pokemon.url) {
      this.dashboardService
        .getPokemon(this.pokemon.url)
        .subscribe((response) => {
          this.pokemonDetail = response;
        });
    }
  }
}
