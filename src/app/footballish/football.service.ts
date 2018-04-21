import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';

import { FootballTeams, WeeklyGame, WeeklyGames } from './football-teams.model';
import { FootballSchedule } from './football-schedule.model';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { FormBuilder } from '@angular/forms';

@Injectable()
export class FootballService {
  teamUrl = '/assets/data/teams.json';
  teamChanged = new Subject<FootballTeams[]>();
  teams: FootballTeams[];
  footballsch: FootballSchedule[] = [];
  footballSchChanged = new Subject<FootballSchedule[]>();
  ftbSchUrl = '/assets/data/schedule.json';
  weeklyGames: WeeklyGames[];
  weeklygamesUrl = '/assets/data/teams.json';
  arrayForm = this.formBuilder.array([]);

  private weekly: WeeklyGame[] = [
    new WeeklyGame(1, 1, 'away', 'NYJ'),
    new WeeklyGame(1, 1, 'home', 'BUF'),
    new WeeklyGame(1, 2, 'away', 'BAL'),
    new WeeklyGame(1, 2, 'home', 'CIN'),
    new WeeklyGame(1, 3, 'away', 'SEA'),
    new WeeklyGame(1, 3, 'home', 'GB'),
    new WeeklyGame(1, 4, 'away', 'CHI'),
    new WeeklyGame(1, 4, 'home', 'SF'),
    new WeeklyGame(1, 5, 'away', 'PIT'),
    new WeeklyGame(1, 5, 'home', 'CLE'),
    new WeeklyGame(1, 6, 'away', 'MIN'),
    new WeeklyGame(1, 6, 'home', 'LAR'),
    new WeeklyGame(1, 7, 'away', 'TEN'),
    new WeeklyGame(1, 7, 'home', 'NE'),
    new WeeklyGame(1, 8, 'away', 'JAX'),
    new WeeklyGame(1, 8, 'home', 'HOU'),
  ];

  private footballteamlist: FootballTeams[] = [
    new FootballTeams(1, 'Philadelphia Eagles', 'PHI'),
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
    new FootballTeams(1, 'Philadelphia Eagles', 'PHI'),
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

  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

  getTeams() {
    return this.footballteamlist.slice();
  }

  getNFCteams() {
    return this.NFCTeamlist.slice();
  }

  getAFCteams() {
    return this.AFCTeamlist.slice();
  }

  getTeamsFile() {
    return this.http.get<FootballTeams[]>(this.teamUrl, {responseType: 'json'}).map((teams) => {
        this.teams = teams;
        // console.log('json', teams);
        return this.teams;
      });
  }

  getWeeklyGames() {
    return this.http.get<WeeklyGames[]>(this.weeklygamesUrl, {responseType: 'json'}).map((weeklyGames) => {
      this.weeklyGames = weeklyGames;
      console.log('json', weeklyGames);
      return this.weeklyGames;
    });
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
  }

  getNewFootballSch() {
    this.http.get<FootballSchedule[]>(this.ftbSchUrl, {
      observe: 'body',
      responseType: 'json'
    })
      .map(
        (footballschs) => {
          for (const footballsch of footballschs) { /* any custom work here */ }
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

  addArrayFormGames(pickedTeams: any) {
    this.arrayForm = this.formBuilder.array([]);
    this.arrayForm.push(pickedTeams);
    // console.log('in service picks', this.arrayForm);
  }

  getArrayFromGames() {
    return this.arrayForm;
  }

}
