import { Component, OnInit, Input } from '@angular/core';
import { CourseModel } from 'src/app/models/course.model';

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


  constructor() { }

  ngOnInit() {
    this.minImageUrl = this.baseMinImageUrl + this.minImageUrlMap.get(this.course.category);
  }

}
