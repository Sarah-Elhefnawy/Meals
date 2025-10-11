import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from "primeng/button";
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-not-found',
  imports: [Button, CardModule, RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {

}
