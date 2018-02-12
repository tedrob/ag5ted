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
    new FootballTeams('Philadephia', 'PHI'),
    new FootballTeams('Dallas Cowboys', 'DAL'),
    new FootballTeams('New York Giants', 'NYG'),
    new FootballTeams('Washington Redskins', 'WAS'),
    new FootballTeams('Minnesota Vikings', 'MIN'),
    new FootballTeams('Detroit Lions', 'DET'),
    new FootballTeams('Green Bay Packers', 'GB'),
    new FootballTeams('Chicago Bears', 'CHI'),
    new FootballTeams('New Orleans Saints', 'NO'),
    new FootballTeams('Carolina Panthers', 'CAR'),
    new FootballTeams('Atlanta Falcons', 'ATL'),
    new FootballTeams('Tampa Bay Buccaneers', 'TB'),
    new FootballTeams('Los Angeles Rams', 'LAR'),
    new FootballTeams('Seattle Seahawks', 'SEA'),
    new FootballTeams('Arizona Cardinals', 'ARI'),
    new FootballTeams('San Francisco 49ers', 'SF'),
    new FootballTeams('New England', 'NE'),
    new FootballTeams('Minnesota Vikings', 'BUF'),
    new FootballTeams('Atlanta Falcons', 'MIA'),
    new FootballTeams('New Orleans Saints', 'NYJ'),
    new FootballTeams('Los Angeles Rams', 'PIT'),
    new FootballTeams('Carolina Panthers', 'BAL'),
    new FootballTeams('Seattle Seahawks', 'CIN'),
    new FootballTeams('Dallas Cowboys', 'CLE'),
    new FootballTeams('New York Giants', 'JAX'),
    new FootballTeams('San Francisco 49ers', 'TEN'),
    new FootballTeams('Detroit Lions', 'IND'),
    new FootballTeams('Green Bay Packers', 'HOU'),
    new FootballTeams('Tampa Bay Buccaneers', 'KC'),
    new FootballTeams('Arizona Cardinals', 'LAC'),
    new FootballTeams('Chicago Bears', 'OAK'),
    new FootballTeams('Washington Redskins', 'DEN')
  ];

  private NFCTeamlist: FootballTeams[] = [
    new FootballTeams('Philadephia', 'PHI'),
    new FootballTeams('Dallas Cowboys', 'DAL'),
    new FootballTeams('New York Giants', 'NYG'),
    new FootballTeams('Washington Redskins', 'WAS'),
    new FootballTeams('Minnesota Vikings', 'MIN'),
    new FootballTeams('Detroit Lions', 'DET'),
    new FootballTeams('Green Bay Packers', 'GB'),
    new FootballTeams('Chicago Bears', 'CHI'),
    new FootballTeams('New Orleans Saints', 'NO'),
    new FootballTeams('Carolina Panthers', 'CAR'),
    new FootballTeams('Atlanta Falcons', 'ATL'),
    new FootballTeams('Tampa Bay Buccaneers', 'TB'),
    new FootballTeams('Los Angeles Rams', 'LAR'),
    new FootballTeams('Seattle Seahawks', 'SEA'),
    new FootballTeams('Arizona Cardinals', 'ARI'),
    new FootballTeams('San Francisco 49ers', 'SF')
  ];
  private AFCTeamlist: FootballTeams[]  = [
    new FootballTeams('New England', 'NE'),
    new FootballTeams('Minnesota Vikings', 'BUF'),
    new FootballTeams('Atlanta Falcons', 'MIA'),
    new FootballTeams('New Orleans Saints', 'NYJ'),
    new FootballTeams('Los Angeles Rams', 'PIT'),
    new FootballTeams('Carolina Panthers', 'BAL'),
    new FootballTeams('Seattle Seahawks', 'CIN'),
    new FootballTeams('Dallas Cowboys', 'CLE'),
    new FootballTeams('New York Giants', 'JAX'),
    new FootballTeams('San Francisco 49ers', 'TEN'),
    new FootballTeams('Detroit Lions', 'IND'),
    new FootballTeams('Green Bay Packers', 'HOU'),
    new FootballTeams('Tampa Bay Buccaneers', 'KC'),
    new FootballTeams('Arizona Cardinals', 'LAC'),
    new FootballTeams('Chicago Bears', 'OAK'),
    new FootballTeams('Washington Redskins', 'DEN')
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

    const req = new HttpRequest('PUT', this.ftbSchUrl, fbsch, {reportProgress: true});
    // console.log('this req ', req);
    return this.httpClient.request(req);
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

}
