import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/components/navbar/navbar';
import { FormsModule } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {MarkdownModule} from 'ngx-markdown';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FormsModule,MarkdownModule],
  providers: [HttpClient],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {}
