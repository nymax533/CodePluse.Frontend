import { Routes } from '@angular/router';
import {CategoryList} from './features/category/category-list/category-list';
import {AddCategory} from './features/category/add-category/add-category';
import {EditCategory} from './features/category/edit-category/edit-category';
import {BlogpostList} from './features/blog-post/blogpost-list/blogpost-list';
import {AddBlogpost} from './features/blog-post/add-blogpost/add-blogpost';
import {EditBlogpost} from './features/blog-post/edit-blogpost/edit-blogpost';

export const routes: Routes = [
  {
    path:'admin/Categories',
    component:CategoryList
  },
  {
    path:'admin/categories/add',
    component: AddCategory
  },
  {
    path:'admin/categories/edit/:id',
    component: EditCategory
  },
  {
    path: 'admin/blogposts',
    component: BlogpostList
  },
  {
    path:'admin/blogposts/add',
    component:AddBlogpost
  },
  {
    path: 'admin/blogposts/edit/:id',
    component: EditBlogpost
  }
];
