import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { CategoriesComponent } from './features/categories/categories.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { SearchComponent } from './features/search/search.component';
import { MealRecipesComponent } from './features/meal-recipes/meal-recipes.component';
import { RecipeDetailComponent } from './features/recipe-detail/recipe-detail.component';
import { AreaComponent } from './features/area/area.component';
import { IngredientComponent } from './features/ingredient/ingredient.component';
import { RandomMealComponent } from './features/random-meal/random-meal.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, title: 'Home Page' },
    { path: 'search', component: SearchComponent, title: 'Search Page' },
    { path: 'random-meals', component: RandomMealComponent, title: 'Random Meal Page' },
    { path: 'category', component: CategoriesComponent, title: 'Category Page' },
    { path: 'area', component: AreaComponent, title: 'Area Page' },
    { path: 'ingredient', component: IngredientComponent, title: 'Ingredient Page' },
    { path: 'meal-recipe', component: MealRecipesComponent, title: 'Recipe Page' },
    { path: 'recipe-detail/:id', component: RecipeDetailComponent, title: 'Recipe Details' },
    { path: '**', component: NotFoundComponent, title: '404' }
];
