import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MealsService } from '../../core/services/meals.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { IRecipeDetails } from '../../core/interfaces/recipe.interface';

@Component({
  selector: 'app-recipe-detail',
  imports: [
    CommonModule, ButtonModule, CardModule, TagModule,
    ChipModule, DividerModule, ScrollPanelModule, ProgressSpinnerModule
  ],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss'
})
export class RecipeDetailComponent implements OnInit {
  private _ActivatedRoute = inject(ActivatedRoute);
  private _Router = inject(Router);
  private _MealsService = inject(MealsService);
  private _cdr = inject(ChangeDetectorRef);

  recipe: IRecipeDetails | null = null;
  loading: boolean = true;
  error: string = '';

  ngOnInit() {
    this._ActivatedRoute.params.subscribe(params => {
      const mealId = params['id'];
      if (mealId) {
        this.loadRecipeDetails(mealId);
      } else {
        // Use setTimeout to avoid change detection error
        setTimeout(() => {
          this.error = 'No recipe ID provided';
          this.loading = false;
          this._cdr.detectChanges();
        });
      }
    });
  }

  loadRecipeDetails(mealId: string) {
    this.loading = true;
    this.error = '';

    this._MealsService.getMealDetailsById(mealId).subscribe({
      next: (response) => {
        setTimeout(() => {
          if (response.meals && response.meals.length > 0) {
            this.recipe = response.meals[0];
            console.log('Recipe details loaded:', this.recipe);
          } else {
            this.error = 'Recipe not found';
          }
          this.loading = false;
          this._cdr.detectChanges();
        });
      },
      error: (err) => {
        console.error('Error fetching recipe details:', err);
        setTimeout(() => {
          this.error = 'Failed to load recipe details';
          this.loading = false;
          this._cdr.detectChanges();
        });
      }
    });
  }

  getIngredients(recipe: IRecipeDetails): { ingredient: string, measure: string }[] {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}` as keyof IRecipeDetails] as string;
      const measure = recipe[`strMeasure${i}` as keyof IRecipeDetails] as string;

      if (ingredient && ingredient.trim() !== '') {
        ingredients.push({
          ingredient: ingredient.trim(),
          measure: measure ? measure.trim() : ''
        });
      }
    }
    return ingredients;
  }

  getInstructionsArray(instructions: string): string[] {
    const lines = instructions.split('\r\n').filter(line => line.trim() !== '');

    return lines.map(line => {
      // Remove step numbering patterns but keep the actual instruction
      return line
        .replace(/^(STEP\s*\d+|Step\s*\d+|\d+\.?)\s*/i, '')
        .trim();
    }).filter(instruction => instruction !== '');
  }

  getTagsArray(tags: string): string[] {
    return tags ? tags.split(',').map(tag => tag.trim()) : [];
  }

  watchVideo(youtubeUrl: string) {
    if (youtubeUrl) {
      window.open(youtubeUrl, '_blank');
    }
  }

  viewSource(sourceUrl: string) {
    if (sourceUrl) {
      window.open(sourceUrl, '_blank');
    }
  }

  goBack() {
    this._Router.navigate(['/meal-recipe']);
  }
}