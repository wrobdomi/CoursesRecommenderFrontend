import { Component, OnInit, Input } from '@angular/core';
import { CourseModel } from 'src/app/models/course.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit {


  @Input() course: CourseModel;
  @Input() minImageUrl: string;


  constructor() { }

  ngOnInit() {

  }

}
