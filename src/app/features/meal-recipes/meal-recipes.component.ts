import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMealRecipes } from '../../core/interfaces/meal-recipes.interface';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-meal-recipes',
  imports: [CommonModule, CardModule, ButtonModule, TagModule, DialogModule, TooltipModule],
  templateUrl: './meal-recipes.component.html',
  styleUrl: './meal-recipes.component.scss'
})
export class MealRecipesComponent implements OnInit {
  private _Router = inject(Router);

  mealRecipes: IMealRecipes[] = [];
  categoryName: string = '';

  ngOnInit() {
    console.log('MealRecipesComponent initialized');
    
    // Method 1: Get from current navigation (works during navigation)
    const navigation = this._Router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.mealRecipes = navigation.extras.state['mealRecipes'] || [];
      this.categoryName = navigation.extras.state['categoryName'] || 'Recipes';
    } else {
      // Method 2: Get from browser history (works after page reload/navigation)
      const state = history.state;
      if (state) {
        this.mealRecipes = state['mealRecipes'] || [];
        this.categoryName = state['categoryName'] || 'Recipes';
      }
    }

    console.log('Final recipes:', this.mealRecipes);
  }

  viewRecipeDetail(recipe: IMealRecipes) {
    // Navigate to recipe detail page with meal ID
    this._Router.navigate(['/recipe-detail', recipe.idMeal]);
  }

  goBack() {
    this._Router.navigate(['/category']);
  }
}