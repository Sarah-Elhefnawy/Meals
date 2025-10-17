import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MealsService } from '../../core/services/meals.service';
import { IArea } from '../../core/interfaces/iarea.interface';

@Component({
  selector: 'app-area',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './area.component.html',
  styleUrl: './area.component.scss'
})
export class AreaComponent implements OnInit {
  private _MealsService = inject(MealsService);
  
  areas: IArea[] = [];
  loading: boolean = false;

  ngOnInit() {
    this.loadAreas();
  }

  loadAreas() {
    this.loading = true;
    this._MealsService.getArea().subscribe({
      next: (response) => {
        this.areas = response.meals || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading areas:', err);
        this.loading = false;
      }
    });
  }
}