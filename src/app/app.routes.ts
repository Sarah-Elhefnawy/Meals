import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { CategoriesComponent } from './features/categories/categories.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { SearchComponent } from './features/search/search.component';
import { MealRecipesComponent } from './features/meal-recipes/meal-recipes.component';
import { RecipeDetailComponent } from './features/recipe-detail/recipe-detail.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, title: 'Home Page' },
    { path: 'search', component: SearchComponent, title: 'Search Page' },
    { path: 'category', component: CategoriesComponent, title: 'Category Page' },
    { path: 'meal-recipe', component: MealRecipesComponent, title: 'Recipe Page' },
    { path: 'recipe-detail/:id', component: RecipeDetailComponent, title: 'Recipe Details' },
    { path: '**', component: NotFoundComponent, title: '404' }
];
