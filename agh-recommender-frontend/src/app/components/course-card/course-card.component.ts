import { Component, OnInit, Input } from '@angular/core';
import { CourseModel } from 'src/app/models/course.model';
import { Router } from '@angular/router';
import { CourseDetailsService } from 'src/app/services/course-details.service';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit {


  @Input() course: CourseModel;
  minImageUrl: string;

  baseMinImageUrl = '../../../assets/images/';
  minImageUrlMap = new Map([
    ['Automatyka i Robotyka', 'air_icon.png'],
    ['Elektrotechnika', 'electro_icon.jpg'],
    ['Informatyka', 'inf_icon.png'],
    ['Mikroelektronika', 'micro_icon.png'],
    ['Inżynieria biomedyczna', 'biomed_icon.png']
  ]);
  fullMinUrl = '';


  constructor(private router: Router, private courseDetailsService: CourseDetailsService) { }

  ngOnInit() {
    this.minImageUrl = this.baseMinImageUrl + this.minImageUrlMap.get(this.course.category);
  }

  onCoureDetailsClicked() {
    console.log('Course details clicked !');
    this.courseDetailsService.setCourseModel(this.course);
    const route = 'courses/' + this.course.courseId;
    this.router.navigate([route]);
  }

}
