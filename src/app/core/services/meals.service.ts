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

  getArea(): Observable<any> {
    return this._HttpClient.get('https://www.themealdb.com/api/json/v1/1/list.php?a')
  }

  getIngredient(): Observable<any> {
    return this._HttpClient.get('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
  }

  getCategory(): Observable<any> {
    return this._HttpClient.get('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
  }

  getCategoryMealsByName(MealName: string): Observable<any> {
    return this._HttpClient.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${MealName}`);
  }

  searchMealsByName(name: string): Observable<any> {
    return this._HttpClient.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  }

  searchMealsByFirstLetter(letter: string): Observable<any> {
    return this._HttpClient.get(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
  }

  filterByIngredient(ingredient: string): Observable<any> {
    return this._HttpClient.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  }

  filterByCategory(category: string): Observable<any> {
    return this._HttpClient.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  }

  filterByArea(area: string): Observable<any> {
    return this._HttpClient.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
  }

  getRandomMeal(): Observable<any> {
    return this._HttpClient.get('https://www.themealdb.com/api/json/v1/1/random.php');
  }
}
