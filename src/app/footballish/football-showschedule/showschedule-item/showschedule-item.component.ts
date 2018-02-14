import { Component, OnInit, Input } from '@angular/core';
import { FootballSchedule } from '../../football-schedule.model';

@Component({
  selector: 'app-showschedule-item',
  templateUrl: './showschedule-item.component.html',
  styleUrls: ['./showschedule-item.component.css']
})
export class ShowscheduleItemComponent implements OnInit {
  @Input() footballSchedule: FootballSchedule;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
