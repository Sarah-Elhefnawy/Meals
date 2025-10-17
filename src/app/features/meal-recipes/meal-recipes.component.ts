import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MealsService } from '../../core/services/meals.service';
import { IMealRecipes } from '../../core/interfaces/meal-recipes.interface';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressSpinner } from "primeng/progressspinner";

@Component({
  selector: 'app-meal-recipes',
  imports: [CommonModule, CardModule, ButtonModule, TagModule, DialogModule, TooltipModule, ProgressSpinner],
  templateUrl: './meal-recipes.component.html',
  styleUrl: './meal-recipes.component.scss'
})
export class MealRecipesComponent implements OnInit {
  private _Router = inject(Router);
  private _ActivatedRoute = inject(ActivatedRoute);
  private _MealsService = inject(MealsService);
  private _cdr = inject(ChangeDetectorRef);

  mealRecipes: IMealRecipes[] = [];
  categoryName: string = '';
  loading: boolean = true;

  ngOnInit() {
    this._ActivatedRoute.queryParams.subscribe(params => {
      const category = params['category'];
      if (category) {
        this.categoryName = category;
        this.loadRecipes(category);
      } else {
        this.loading = false;
        this._cdr.detectChanges();
      }
    });
  }

  loadRecipes(categoryName: string) {
    this.loading = true;
    this._MealsService.getCategoryMealsByName(categoryName).subscribe({
      next: (value) => {
        setTimeout(() => {
          this.mealRecipes = value.meals;
          this.loading = false;
          this._cdr.detectChanges();
        });
      },
      error: (err) => {
        setTimeout(() => {
          this.loading = false;
          this._cdr.detectChanges();
        });
      }
    });
  }

  viewRecipeDetail(recipe: IMealRecipes) {
    this._Router.navigate(['/recipe-detail', recipe.idMeal]);
  }

  goBack() {
    this._Router.navigate(['/category']);
  }
}