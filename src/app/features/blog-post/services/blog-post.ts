import { Injectable } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { Observable } from 'rxjs';
import { BlogPostModel } from '../models/blog-post.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import {EditBlogpost} from '../edit-blogpost/edit-blogpost';
import {BlogPostsEditModel} from '../models/edit-model';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {
  constructor(private http: HttpClient) {}

  createBlogPost(data: AddBlogPost): Observable<BlogPostModel> {
    return this.http.post<BlogPostModel>(`${environment.apiBaseUrl}/BlogPosts`, data);
  }

  getAllBlogPosts(): Observable<BlogPostModel[]> {
    return this.http.get<BlogPostModel[]>(`${environment.apiBaseUrl}/BlogPosts`);
  }
  getBlogPostById(id: string): Observable<BlogPostModel> {
    return this.http.get<BlogPostModel>(`${environment.apiBaseUrl}/BlogPosts/${id}`);
  }
  updateBlogPost(id: string, data: BlogPostsEditModel): Observable<BlogPostModel>{
    return this.http.put<BlogPostModel>(`${environment.apiBaseUrl}/BlogPosts/${id}`, data);
  }
  deleteBlogPost(id: string): Observable<BlogPostModel> {
    return this.http.delete<BlogPostModel>(`${environment.apiBaseUrl}/BlogPosts/${id}`);
  }
}
