export interface CourseModel {
  courseId: string;
  name: string;
  category: string;
  imageUrl: string;
  syllabusUrl: string;
  description: string;
  price: number;
  publicationDate: Date;
  averageRating: number;
}
