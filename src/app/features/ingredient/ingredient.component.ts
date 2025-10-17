import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MealsService } from '../../core/services/meals.service';
import { IIngrediant } from '../../core/interfaces/iingrediant.interface';

@Component({
  selector: 'app-ingredient',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ingredient.component.html',
  styleUrl: './ingredient.component.scss'
})
export class IngredientComponent implements OnInit {
  private _MealsService = inject(MealsService);
  
  ingredients: IIngrediant[] = [];
  loading: boolean = false;

  ngOnInit() {
    this.loadIngredients();
  }

  loadIngredients() {
    this.loading = true;
    this._MealsService.getIngredient().subscribe({
      next: (response) => {
        this.ingredients = response.meals || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading ingredients:', err);
        this.loading = false;
      }
    });
  }

  getIngredientImage(ingredientName: string): string {
    return `https://www.themealdb.com/images/ingredients/${ingredientName}.png`;
  }

  handleImageError(event: any) {
    event.target.src = './Home/7760422.jpg';
  }
}