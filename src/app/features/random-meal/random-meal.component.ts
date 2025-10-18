import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
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
  private _cdr = inject(ChangeDetectorRef);
  
  currentMeal: IMealRecipes | null = null;
  loading: boolean = false;

  ngOnInit() {
    this.loadRandomMeal();
  }

  loadRandomMeal() {
    this.loading = true;
    this._cdr.detectChanges();
    
    this._MealsService.getRandomMeal().subscribe({
      next: (response) => {
        if (response.meals && response.meals[0]) {
          this.currentMeal = response.meals[0];
        }
        this.loading = false;
        this._cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading random meal:', err);
        this.loading = false;
        this._cdr.detectChanges();
      }
    });
  }

  handleImageError(event: any) {
    event.target.src = './Home/7760422.jpg';
  }
}