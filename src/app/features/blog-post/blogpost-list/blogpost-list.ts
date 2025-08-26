import { Component, OnInit } from '@angular/core';
import {RouterLink, RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { BlogPostService } from '../services/blog-post';
import { BlogPostModel } from '../models/blog-post.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blogpost-list',
  imports: [CommonModule, RouterLink,RouterModule],
  templateUrl: './blogpost-list.html',
  styleUrl: './blogpost-list.css'
})
export class BlogpostList implements OnInit {
  blogPosts$?: Observable<BlogPostModel[]>;

  constructor(private blogPostService: BlogPostService) {}

  ngOnInit() {
    this.blogPosts$ = this.blogPostService.getAllBlogPosts();
  }
}
