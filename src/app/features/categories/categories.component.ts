import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { MealsService } from '../../core/services/meals.service';
import { Router } from '@angular/router';
import { ICategory } from '../../core/interfaces/category.interface';
import { IMealRecipes } from '../../core/interfaces/meal-recipes.interface';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-categories',
  imports: [CommonModule, CardModule, ButtonModule, TagModule, ProgressSpinnerModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  private _MealsService = inject(MealsService);
  private _Router = inject(Router);
  private _cdr = inject(ChangeDetectorRef);

  categories: ICategory[] = [];
  CMealRecipes: IMealRecipes[] = [];
  loading: boolean = true;

  getCategories() {
    this.loading = true;
    this._MealsService.getAllCategories().subscribe({
      next: (value) => {
        this.categories = value.categories;
        setTimeout(() => {
          this.loading = false;
          this._cdr.detectChanges();
        });
      },
      error: (err) => {
        console.log(err);
        setTimeout(() => {
          this.loading = false;
          this._cdr.detectChanges();
        });
      },
    })
  }

  getOneMealDetail() {            //              not yet
    this._MealsService.getMealDetailsById('52772').subscribe({
      next: (value) => {
        console.log('here' + value);
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

  getCategoryMeals(categoryName: string) {
    this._MealsService.getCategoryMealsByName(categoryName).subscribe({
      next: (value) => {
        this.CMealRecipes = value.meals;
        this._Router.navigate(['/meal-recipe'], {
          queryParams: { category: categoryName }
        })
      },
      error: (err) => {
        console.error(err);
      },
    })
  }

  ngOnInit() {
    this.getCategories();
  }
}
