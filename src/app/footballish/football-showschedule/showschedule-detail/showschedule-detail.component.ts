import { Component, OnInit, Input } from '@angular/core';
import { FootballSchedule } from '../../football-schedule.model';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { FootballService } from '../../football.service';

@Component({
  selector: 'app-showschedule-detail',
  templateUrl: './showschedule-detail.component.html',
  styleUrls: ['./showschedule-detail.component.css']
})
export class ShowscheduleDetailComponent implements OnInit {
  @Input() footballSch: FootballSchedule;
  id: number;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private footballService: FootballService) { }

  ngOnInit() {
    const id = this.route.params
                .subscribe(
                  (params: Params) => {
                    this.id = params['id'];
                    this.footballSch = this.footballService.getFootballSchwk(this.id);
                  }
                );
  }

}
