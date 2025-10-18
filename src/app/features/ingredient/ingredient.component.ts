import { Component, inject, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealsService } from '../../core/services/meals.service';

interface Ingredient {
  idIngredient: string;
  strIngredient: string;
  strDescription: string;
}

@Component({
  selector: 'app-ingredient',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ingredient.component.html',
  styleUrl: './ingredient.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IngredientComponent implements OnInit {
  private _MealsService = inject(MealsService);
  private _cdr = inject(ChangeDetectorRef);

  ingredients: Ingredient[] = [];
  loading: boolean = false;
  visibleIngredients: number = 20;

  ngOnInit() {
    this.loadIngredients();
  }

  loadIngredients() {
    this.loading = true;
    this._cdr.markForCheck(); // Correct with OnPush strategy

    this._MealsService.getIngredient().subscribe({
      next: (response) => {
        this.ingredients = response.meals || [];
        this.loading = false;
        this._cdr.markForCheck(); // Update view after data arrives
      },
      error: (err) => {
        console.error('Error loading ingredients:', err);
        this.loading = false;
        this._cdr.markForCheck();
      }
    });
  }

  loadMore() {
    this.visibleIngredients += 20;
    this._cdr.markForCheck();
  }

  getIngredientImage(ingredientName: string): string {
    return `https://www.themealdb.com/images/ingredients/${ingredientName}.png`;
  }

  handleImageError(event: any) {
    event.target.src = './Home/7760422.jpg';
  }

  getIngredientColor(index: number): string {
    const colors = ['#FFD700', '#FF6B6B', '#4CAF50', '#2196F3', '#9C27B0', '#FF9800'];
    return colors[index % colors.length];
  }

  getVisibleIngredients(): Ingredient[] {
    return this.ingredients.slice(0, this.visibleIngredients);
  }

  hasMoreIngredients(): boolean {
    return this.visibleIngredients < this.ingredients.length;
  }
}