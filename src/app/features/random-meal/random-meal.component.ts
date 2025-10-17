import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MealsService } from '../../core/services/meals.service';
import { IMealRecipes } from '../../core/interfaces/meal-recipes.interface';

@Component({
  selector: 'app-random-meals',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './random-meal.component.html',
  styleUrl: './random-meal.component.scss'
})
export class RandomMealComponent implements OnInit {
  private _MealsService = inject(MealsService);
  
  randomMeals: IMealRecipes[] = [];
  loading: boolean = false;

  ngOnInit() {
    this.loadRandomMeals();
  }

  loadRandomMeals() {
    this.loading = true;
    const requests = Array.from({ length: 8 }, () => 
      this._MealsService.getRandomMeal()
    );

    // Since we can only get one random meal at a time, we'll make multiple requests
    requests.forEach(request => {
      request.subscribe({
        next: (response) => {
          if (response.meals && response.meals[0]) {
            this.randomMeals.push(response.meals[0]);
          }
        },
        error: (err) => {
          console.error('Error loading random meal:', err);
        },
        complete: () => {
          this.loading = false;
        }
      });
    });
  }

  refreshRandomMeals() {
    this.randomMeals = [];
    this.loadRandomMeals();
  }

  handleImageError(event: any) {
    event.target.src = './Home/7760422.jpg';
  }
}