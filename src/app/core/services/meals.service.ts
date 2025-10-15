import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealsService {
  private _HttpClient = inject(HttpClient);

  getAllCategories(): Observable<any> {
    return this._HttpClient.get('https://www.themealdb.com/api/json/v1/1/categories.php')
  }

  getMealDetailsById(mealId: string): Observable<any> {
    return this._HttpClient.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
  }

  getCategoryMealsByName(MealName: string): Observable<any> {
    return this._HttpClient.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${MealName}`);
  }

}
