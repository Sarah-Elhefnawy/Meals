import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealsService } from '../../core/services/meals.service';
import { IArea } from '../../core/interfaces/iarea.interface';

@Component({
  selector: 'app-area',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './area.component.html',
  styleUrl: './area.component.scss'
})
export class AreaComponent implements OnInit {
  private _MealsService = inject(MealsService);
  private _cdr = inject(ChangeDetectorRef);
  
  areas: IArea[] = [];
  loading: boolean = false;

  ngOnInit() {
    this.loadAreas();
  }

  loadAreas() {
    this.loading = true;
    this._cdr.detectChanges();
    
    this._MealsService.getArea().subscribe({
      next: (response) => {
        this.areas = response.meals || [];
        this.loading = false;
        this._cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading areas:', err);
        this.loading = false;
        this._cdr.detectChanges();
      }
    });
  }

  getAreaFlag(areaName: string): string {
    const flags: { [key: string]: string } = {
      'American': '🇺🇸', 'British': '🇬🇧', 'Canadian': '🇨🇦', 'Chinese': '🇨🇳',
      'Croatian': '🇭🇷', 'Dutch': '🇳🇱', 'Egyptian': '🇪🇬', 'Filipino': '🇵🇭',
      'French': '🇫🇷', 'Greek': '🇬🇷', 'Indian': '🇮🇳', 'Irish': '🇮🇪',
      'Italian': '🇮🇹', 'Jamaican': '🇯🇲', 'Japanese': '🇯🇵', 'Kenyan': '🇰🇪',
      'Malaysian': '🇲🇾', 'Mexican': '🇲🇽', 'Moroccan': '🇲🇦', 'Polish': '🇵🇱',
      'Portuguese': '🇵🇹', 'Russian': '🇷🇺', 'Spanish': '🇪🇸', 'Thai': '🇹🇭',
      'Tunisian': '🇹🇳', 'Turkish': '🇹🇷', 'Ukrainian': '🇺🇦', 'Vietnamese': '🇻🇳'
    };
    return flags[areaName] || '🌍';
  }
}