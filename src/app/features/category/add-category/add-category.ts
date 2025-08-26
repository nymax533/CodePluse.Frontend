import {Component, OnDestroy} from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.models';
import { FormsModule } from '@angular/forms';
import {CategoryService} from '../services/category';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-category.html',
  styleUrl: './add-category.css'
})
export class AddCategory implements OnDestroy{
  model: AddCategoryRequest;
  private addCategorySubscription?: Subscription;
  constructor(private categoryService: CategoryService,
              private router: Router) {
    this.model = {
      name: '',
      urlHandle: ''
    };
  }


  onSubmit() {
   this.addCategorySubscription = this.categoryService.addCategory(this.model).subscribe({
        next: (response) => {
          this.router.navigate(['/admin/Categories']);
        },
      }
    );
  }

  ngOnDestroy(): void {
    this.addCategorySubscription?.unsubscribe();
  }

}
