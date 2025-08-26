import {Category} from '../../category/models/Category.model';

export interface BlogPostModel {
  id: string;
  title: string;
  shortDescription: string;
  urlHandle: string;
  content: string;
  featuredImageUrl: string;
  author: string;
  publishedDate: Date;
  isVisible: boolean;
  categories:Category [];
}
