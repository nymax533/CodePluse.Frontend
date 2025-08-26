import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {BlogPostService} from '../services/blog-post';
import {BlogPostModel} from '../models/blog-post.model';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CategoryService} from '../../category/services/category';
import {Category} from '../../category/models/Category.model';
import {BlogPostsEditModel} from '../models/edit-model';
import {ImageSelector} from '../../../shared/components/image-selector/image-selector';

@Component({
  selector: 'app-edit-blogpost',
  imports: [CommonModule, FormsModule, ImageSelector],
  templateUrl: './edit-blogpost.html',
  styleUrl: './edit-blogpost.css'
})
export class EditBlogpost implements OnInit, OnDestroy {
  id: string | null = null;
  model?: BlogPostModel;
  blogpostSubscription?: Subscription;
  routeSubscription?: Subscription;
  categories$?: Observable<Category[]>;
  selectedCategory: string[] = [];
  deleteBlogPostSubscription?: Subscription;
  isImageSelectorVisible = false;

  constructor(
    private route: ActivatedRoute,
    private blogpostService: BlogPostService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();

    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if (this.id) {
          this.blogpostService.getBlogPostById(this.id).subscribe({
            next: (response) => {
              this.model = response;
              this.selectedCategory = this.model.categories?.map((c: Category) => c.id) || [];
              console.log(this.model);
            }
          });
        }
      }
    });
  }

  ngOnDestroy() {
    this.routeSubscription?.unsubscribe();
    this.blogpostSubscription?.unsubscribe();
    this.blogpostSubscription?.unsubscribe();
  }

  onFormSubmit() {
    if (this.model != null && this.id) {
      const payload: BlogPostsEditModel = {
        title: this.model.title,
        shortDescription: this.model.shortDescription,
        urlHandle: this.model.urlHandle,
        content: this.model.content,
        featuredImageUrl: this.model.featuredImageUrl,
        author: this.model.author,
        publishedDate: this.model.publishedDate,
        isVisible: this.model.isVisible,
        categoryIds: this.selectedCategory
      };

      this.blogpostSubscription = this.blogpostService.updateBlogPost(this.id, payload).subscribe({
        next: (response) => {
          this.router.navigate(['/admin/blogposts']);
        }
      });
    }
  }
  onDelete(){
    if(this.id){
      this.blogpostService.deleteBlogPost(this.id).subscribe({
        next: (response) => {
          this.router.navigate(['/admin/blogposts']);
        }
      })
    }
  }

  openImageSelector() {
    this.isImageSelectorVisible = true;
  }

  closeImageSelector() {
    this.isImageSelectorVisible = false;
  }
}
