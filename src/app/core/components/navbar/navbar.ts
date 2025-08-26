import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  imports: [
    RouterLink
  ],
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {}
