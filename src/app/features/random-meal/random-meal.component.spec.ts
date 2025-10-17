import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomMealComponent } from './random-meal.component';

describe('RandomMealComponent', () => {
  let component: RandomMealComponent;
  let fixture: ComponentFixture<RandomMealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomMealComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandomMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
