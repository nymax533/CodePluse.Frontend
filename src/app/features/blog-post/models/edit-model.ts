export interface BlogPostsEditModel {
  title: string;
  shortDescription: string;
  urlHandle: string;
  content: string;
  featuredImageUrl: string;
  author: string;
  publishedDate: Date;
  isVisible: boolean;
  categoryIds: string[]; // Изменил с categories на categoryIds
}
