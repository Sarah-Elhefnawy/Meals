import { Component } from '@angular/core';
import { Button } from "primeng/button";
import { ToolbarModule } from 'primeng/toolbar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [Button, ToolbarModule, IconFieldModule, InputIconModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
