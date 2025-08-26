import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category';
import { Category } from '../models/Category.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UpdateCategoryRequest } from '../models/update-category-request.model';

@Component({
  selector: 'app-edit-category',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-category.html',
  styleUrl: './edit-category.css'
})
export class EditCategory implements OnInit, OnDestroy {
  id: string | null = null;
  paramSubscription?: Subscription;
  editCategorySubscription?: Subscription;
  category?: Category;


  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.paramSubscription = this.route.paramMap.subscribe({
      next: params => {
        this.id = params.get('id');
        if (this.id) {
          this.categoryService.getCategoryById(this.id)
            .subscribe({
              next: response => {
                this.category = response;
                console.log(this.category);
              }
            });
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
    this.editCategorySubscription?.unsubscribe();
  }

  onFormSubmit() {
    const updatedCategoryRequest: UpdateCategoryRequest = {
      name: this.category?.name || '',
      urlHandle: this.category?.urlHandle || ''
    };
    if (this.id) {
      this.editCategorySubscription = this.categoryService.updateCategory(this.id, updatedCategoryRequest).subscribe({
        next: (response) => {
          this.router.navigate(['/admin/Categories']);
        }
      });
    }
  }

  onDelete() {
    if (this.id) {
      this.categoryService.deleteCategory(this.id).subscribe({
        next: (response) => {
          this.router.navigate(['/admin/Categories']);
        }
      });
    }
  }
}
