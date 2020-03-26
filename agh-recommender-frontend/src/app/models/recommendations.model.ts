import { CourseModel } from './course.model';

export interface RecommendationsModel {
  courseName: string;
  courseDtoList: CourseModel[];
}
