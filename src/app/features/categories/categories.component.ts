import { Component, inject } from '@angular/core';
import { MealsService } from '../../core/services/meals.service';
import { TabsModule } from 'primeng/tabs';
import { ICategory } from '../../core/interfaces/category.interface';
import { SplitterModule } from 'primeng/splitter';
import { Button } from "primeng/button";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [TabsModule, SplitterModule, Button, RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  private _MealsService = inject(MealsService);

  category: ICategory[] = [];

  getCategory() {
    this._MealsService.getAllCategories().subscribe({
      next: (value) => {
        this.category = value.categories;
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

  ngOnInit() {
    this.getCategory();
    
  }
}
