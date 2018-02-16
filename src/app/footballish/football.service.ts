import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

import { FootballTeams } from './football-teams.model';
import { FootballSchedule } from './football-schedule.model';
import { Subject } from 'rxjs/Subject';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class FootballService {
  footballsch: FootballSchedule[] = [];
  footballSchChanged = new Subject<FootballSchedule[]>();
  ftbSchUrl = '/assets/data/schedule.json';  // URL to json file

  private footballteamlist: FootballTeams[] = [
    new FootballTeams(1, 'Philadephia', 'PHI'),
    new FootballTeams(2, 'Dallas Cowboys', 'DAL'),
    new FootballTeams(3, 'New York Giants', 'NYG'),
    new FootballTeams(4, 'Washington Redskins', 'WAS'),
    new FootballTeams(5, 'Minnesota Vikings', 'MIN'),
    new FootballTeams(6, 'Detroit Lions', 'DET'),
    new FootballTeams(7, 'Green Bay Packers', 'GB'),
    new FootballTeams(8, 'Chicago Bears', 'CHI'),
    new FootballTeams(9, 'New Orleans Saints', 'NO'),
    new FootballTeams(10, 'Carolina Panthers', 'CAR'),
    new FootballTeams(11, 'Atlanta Falcons', 'ATL'),
    new FootballTeams(12, 'Tampa Bay Buccaneers', 'TB'),
    new FootballTeams(13, 'Los Angeles Rams', 'LAR'),
    new FootballTeams(14, 'Seattle Seahawks', 'SEA'),
    new FootballTeams(15, 'Arizona Cardinals', 'ARI'),
    new FootballTeams(16, 'San Francisco 49ers', 'SF'),
    new FootballTeams(17, 'New England Patriots', 'NE'),
    new FootballTeams(18, 'Buffalo Bills', 'BUF'),
    new FootballTeams(19, 'Miami Dolphins', 'MIA'),
    new FootballTeams(20, 'New York Jets', 'NYJ'),
    new FootballTeams(21, 'Pittsburgh Steelers', 'PIT'),
    new FootballTeams(22, 'Baltimore Ravens', 'BAL'),
    new FootballTeams(23, 'Cincinnati Bengals', 'CIN'),
    new FootballTeams(24, 'Cleveland Browns', 'CLE'),
    new FootballTeams(25, 'Jacksonville Jaguars', 'JAX'),
    new FootballTeams(26, 'Tennessee Titans', 'TEN'),
    new FootballTeams(27, 'Indianapolis Lions', 'IND'),
    new FootballTeams(28, 'Houston Texans', 'HOU'),
    new FootballTeams(29, 'Kansas City', 'KC'),
    new FootballTeams(30, 'Los Angeles Chargers', 'LAC'),
    new FootballTeams(31, 'Oakland Raiders', 'OAK'),
    new FootballTeams(32, 'Denver Broncos', 'DEN')
  ];

  private NFCTeamlist: FootballTeams[] = [
    new FootballTeams(1, 'Philadephia', 'PHI'),
    new FootballTeams(2, 'Dallas Cowboys', 'DAL'),
    new FootballTeams(3, 'New York Giants', 'NYG'),
    new FootballTeams(4, 'Washington Redskins', 'WAS'),
    new FootballTeams(5, 'Minnesota Vikings', 'MIN'),
    new FootballTeams(6, 'Detroit Lions', 'DET'),
    new FootballTeams(7, 'Green Bay Packers', 'GB'),
    new FootballTeams(8, 'Chicago Bears', 'CHI'),
    new FootballTeams(9, 'New Orleans Saints', 'NO'),
    new FootballTeams(10, 'Carolina Panthers', 'CAR'),
    new FootballTeams(11, 'Atlanta Falcons', 'ATL'),
    new FootballTeams(12, 'Tampa Bay Buccaneers', 'TB'),
    new FootballTeams(13, 'Los Angeles Rams', 'LAR'),
    new FootballTeams(14, 'Seattle Seahawks', 'SEA'),
    new FootballTeams(15, 'Arizona Cardinals', 'ARI'),
    new FootballTeams(16, 'San Francisco 49ers', 'SF')
  ];
  private AFCTeamlist: FootballTeams[]  = [
    new FootballTeams(17, 'New England Patriots', 'NE'),
    new FootballTeams(18, 'Buffalo Bills', 'BUF'),
    new FootballTeams(19, 'Miami Dolphins', 'MIA'),
    new FootballTeams(20, 'New York Jets', 'NYJ'),
    new FootballTeams(21, 'Pittsburgh Steelers', 'PIT'),
    new FootballTeams(22, 'Baltimore Ravens', 'BAL'),
    new FootballTeams(23, 'Cincinnati Bengals', 'CIN'),
    new FootballTeams(24, 'Cleveland Browns', 'CLE'),
    new FootballTeams(25, 'Jacksonville Jaguars', 'JAX'),
    new FootballTeams(26, 'Tennessee Titans', 'TEN'),
    new FootballTeams(27, 'Indianapolis Lions', 'IND'),
    new FootballTeams(28, 'Houston Texans', 'HOU'),
    new FootballTeams(29, 'Kansas City Chiefs', 'KC'),
    new FootballTeams(30, 'Los Angeles Chargers', 'LAC'),
    new FootballTeams(31, 'Oakland Raiders', 'OAK'),
    new FootballTeams(32, 'Denver Broncos', 'DEN')
  ];

  constructor(private httpClient: HttpClient) { }

  getTeams() {
    return this.footballteamlist.slice();
  }

  getNFCteams() {
    return this.NFCTeamlist.slice();
  }

  getAFCteams() {
    return this.AFCTeamlist.slice();
  }

  getSeasonStart(startdate: Date) {
  }

  addFootballSch(fbsch: FootballSchedule) {

    this.footballsch.push(fbsch);
    this.footballSchChanged.next(this.footballsch.slice(1));
    const body = JSON.stringify(this.footballsch);

    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    // const req = new HttpRequest('PUT', this.ftbSchUrl, fbsch, {reportProgress: true});
    // console.log('this req ', req);
    // return this.httpClient.request(req);
  }

  getNewFootballSch() {
    this.httpClient.get<FootballSchedule[]>(this.ftbSchUrl, {
      observe: 'body',
      responseType: 'json'
    })
      .map(
        (footballschs) => {
          for (const footballsch of footballschs) {

          }
          return footballschs;
        })
        .subscribe(
          (footballschs: FootballSchedule[]) => {
            this.setFootBallSch(footballschs);
          }
        );
        return [];
  }

  setFootBallSch(footballsch2: FootballSchedule[]) {
    this.footballsch = footballsch2;
    this.footballSchChanged.next(this.footballsch.slice());
  }

  getFootballSch() {
    return this.footballsch.slice();
  }

  getFootballSchwk(index: number) {
    return this.footballsch[index];
  }

}
