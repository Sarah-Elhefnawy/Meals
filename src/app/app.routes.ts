import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { CategoriesComponent } from './features/categories/categories.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { SearchComponent } from './features/search/search.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, title: 'Home Page' },
    { path: 'search', component: SearchComponent, title: 'Search Page' },
    { path: 'category', component: CategoriesComponent, title: 'Category Page' },
    { path: '**', component: NotFoundComponent, title: '404' }
];
