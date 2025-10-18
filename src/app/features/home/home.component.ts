import { Component, inject, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { BadgeModule } from 'primeng/badge';
import { Subject, takeUntil, forkJoin } from 'rxjs';
import { MealsService } from './../../core/services/meals.service';
import { ICategory } from '../../core/interfaces/category.interface';
import { IArea } from '../../core/interfaces/iarea.interface';
import { IIngrediant } from '../../core/interfaces/iingrediant.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    AccordionModule,
    BadgeModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  private _MealsService = inject(MealsService);
  private _cdr = inject(ChangeDetectorRef);
  private destroy$ = new Subject<void>();

  categories: ICategory[] = [];
  areas: IArea[] = [];
  ingredients: IIngrediant[] = [];

  ngOnInit() {
    this.loadHomeData();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadHomeData() {
    forkJoin({
      categories: this._MealsService.getCategory(),
      areas: this._MealsService.getArea(),
      ingredients: this._MealsService.getIngredient()
    })
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (responses) => {
        this.categories = responses.categories?.meals || [];
        this.areas = responses.areas?.meals || [];
        this.ingredients = responses.ingredients?.meals || [];
        this._cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading home data:', err);
        this.handleDataError();
      }
    });
  }

  private handleDataError() {
    this.categories = [];
    this.areas = [];
    this.ingredients = [];
    this._cdr.detectChanges();
  }
}