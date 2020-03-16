import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recommended-courses',
  templateUrl: './recommended-courses.component.html',
  styleUrls: ['./recommended-courses.component.css']
})
export class RecommendedCoursesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSetCategory(category: string) {
    console.log(category);
  }

}
