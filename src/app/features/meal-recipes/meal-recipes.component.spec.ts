import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealRecipesComponent } from './meal-recipes.component';

describe('MealRecipesComponent', () => {
  let component: MealRecipesComponent;
  let fixture: ComponentFixture<MealRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealRecipesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
