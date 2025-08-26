import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { FormsModule } from '@angular/forms';
import { BlogPostService } from '../services/blog-post';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../category/services/category';
import { Category } from '../../category/models/Category.model';

@Component({
  selector: 'app-add-blogpost',
  standalone: true,
  imports: [FormsModule, MarkdownModule, CommonModule],
  providers: [MarkdownService],
  templateUrl: './add-blogpost.html',
  styleUrls: ['./add-blogpost.css']
})
export class AddBlogpost implements OnDestroy, OnInit {
  model: AddBlogPost;
  modelSubscription?: Subscription;
  categories$?: Observable<Category[]>;

  constructor(
    private blogPostService: BlogPostService,
    private router: Router,
    private categoryService: CategoryService
  ) {
    this.model = {
      title: '',
      shortDescription: '',
      urlHandle: '',
      content: '',
      featuredImageUrl: '',
      author: '',
      isVisible: false,
      publishedDate: new Date(),
      categories: []
    };
  }

  ngOnDestroy(): void {
    this.modelSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
  }

  onFormSubmit() {

    const payload = {
      ...this.model,
      categoryIds: this.model.categories
    };
    delete (payload as any).categories;

    this.blogPostService.createBlogPost(payload).subscribe({
      next: () => {
        this.router.navigate(['/admin/blogposts']);
      },
      error: (error) => {
        console.error('API error:', error);
        alert(error.error?.message || 'Failed to create blog post');
      }
    });
  }
}
