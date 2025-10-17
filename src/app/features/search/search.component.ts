import { Component, inject, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MealsService } from './../../core/services/meals.service';
import { IMealRecipes } from '../../core/interfaces/meal-recipes.interface';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnDestroy {
  private _MealsService = inject(MealsService);
  private _cdr = inject(ChangeDetectorRef);
  private destroy$ = new Subject<void>();

  searchQuery: string = '';
  searchType: string = 'name';
  searchResults: IMealRecipes[] = [];
  loading: boolean = false;
  error: string = '';
  hasSearched: boolean = false;

  categories: string[] = [
    'Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat', 'Lamb',
    'Miscellaneous', 'Pasta', 'Pork', 'Seafood', 'Side', 'Starter',
    'Vegan', 'Vegetarian'
  ];

  areas: string[] = [
    'American', 'British', 'Canadian', 'Chinese', 'Croatian', 'Dutch',
    'Egyptian', 'Filipino', 'French', 'Greek', 'Indian', 'Irish',
    'Italian', 'Jamaican', 'Japanese', 'Kenyan', 'Malaysian', 'Mexican',
    'Moroccan', 'Polish', 'Portuguese', 'Russian', 'Spanish', 'Syrian',
    'Thai', 'Tunisian', 'Turkish', 'Ukrainian', 'Uruguayan', 'Vietnamese'
  ];

  letters: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getSearchPlaceholder(): string {
    switch (this.searchType) {
      case 'name': return 'Enter meal name (e.g., Arrabiata)';
      case 'ingredient': return 'Enter ingredient (e.g., chicken)';
      case 'category': return 'Select category from list below';
      case 'area': return 'Select cuisine from list below';
      case 'letter': return 'Select letter from list below';
      default: return 'Enter search term';
    }
  }

  isInputSearch(): boolean {
    return this.searchType === 'name' || this.searchType === 'ingredient';
  }

  search() {
    if (!this.searchQuery.trim() && this.isInputSearch()) {
      this.error = 'Please enter a search term.';
      return;
    }

    this.loading = true;
    this.error = '';
    this.hasSearched = true;
    this.searchResults = [];

    const query = this.searchQuery.trim();
    this.destroy$.next();

    this._cdr.detectChanges();

    switch (this.searchType) {
      case 'name':
        this.searchByName(query);
        break;
      case 'ingredient':
        this.searchByIngredient(query);
        break;
      case 'category':
        this.searchByCategory(query);
        break;
      case 'area':
        this.searchByArea(query);
        break;
      case 'letter':
        this.searchByLetter(query);
        break;
    }
  }

  quickSearch(type: string, value: string) {
    this.searchType = type;
    this.searchQuery = value;
    this.search();
  }

  private searchByName(name: string) {
    this._MealsService.searchMealsByName(name)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.handleSearchResponse(response);
        },
        error: (err) => {
          this.handleSearchError('Error searching for meals. Please try again.');
        }
      });
  }

  private searchByIngredient(ingredient: string) {
    this._MealsService.filterByIngredient(ingredient)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.handleSearchResponse(response);
        },
        error: (err) => {
          this.handleSearchError('Error searching by ingredient. Please try again.');
        }
      });
  }

  private searchByCategory(category: string) {
    this._MealsService.filterByCategory(category)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.handleSearchResponse(response);
        },
        error: (err) => {
          this.handleSearchError('Error searching by category. Please try again.');
        }
      });
  }

  private searchByArea(area: string) {
    this._MealsService.filterByArea(area)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.handleSearchResponse(response);
        },
        error: (err) => {
          this.handleSearchError('Error searching by area. Please try again.');
        }
      });
  }

  private searchByLetter(letter: string) {
    this._MealsService.searchMealsByFirstLetter(letter)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.handleSearchResponse(response);
        },
        error: (err) => {
          this.handleSearchError('Error searching by letter. Please try again.');
        }
      });
  }

  private handleSearchResponse(response: any) {
    console.log('Full API Response:', response);
    
    // For search/filter APIs, we need to fetch full details to get category and area
    if (response?.meals) {
      if (this.searchType === 'name') {
        // Name search returns full details with category and area
        this.searchResults = response.meals;
      } else {
        // Filter searches return basic info - we'll show without category/area
        this.searchResults = response.meals;
      }
    } else {
      this.searchResults = [];
    }
    
    this.loading = false;
    console.log('Processed results:', this.searchResults);
    this._cdr.detectChanges();

    if (!this.searchResults.length) {
      this.error = 'No meals found. Try a different search term.';
    }
  }

  private handleSearchError(errorMessage: string) {
    this.error = errorMessage;
    this.loading = false;
    this.searchResults = [];
    this._cdr.detectChanges();
  }

  clearSearch() {
    this.destroy$.next();
    this.searchQuery = '';
    this.searchResults = [];
    this.error = '';
    this.hasSearched = false;
    this.loading = false;
  }

  handleImageError(event: any) {
    event.target.src = './Home/7760422.jpg';
  }
}