import { Component, OnInit, Input, Output, EventEmitter, OnChanges  } from '@angular/core';
import { CourseModel } from 'src/app/models/course.model';


@Component({
  selector: 'app-new-user-course-card',
  templateUrl: './new-user-course-card.component.html',
  styleUrls: ['./new-user-course-card.component.css']
})
export class NewUserCourseCardComponent implements OnInit, OnChanges {

  @Input() course: CourseModel;
  @Output() ratingReceived = new EventEmitter<number>();
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


  constructor() { }

  ngOnInit() {
    this.minImageUrl = this.baseMinImageUrl + this.minImageUrlMap.get(this.course.category);
  }

  ngOnChanges() {
    this.minImageUrl = this.baseMinImageUrl + this.minImageUrlMap.get(this.course.category);
  }

  onRating(event: any) {
    // console.log(event);
    this.ratingReceived.emit(event);
  }
}
