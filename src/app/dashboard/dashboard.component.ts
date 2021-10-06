import { Component, OnInit } from '@angular/core';
import { DashboardService, Pokemon } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  pokemons: Pokemon[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getPokemonList(20, 0).subscribe((data) => {
      this.pokemons = data.results;
    });
  }
}
