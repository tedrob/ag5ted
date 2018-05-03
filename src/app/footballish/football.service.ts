import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';

import { FootballTeams, WeeklyGame, WeeklyGames, WeeklyGamesAH, WeeklyGmsAHNames } from './football-teams.model';
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
  scheduleType;
  schSeason1stEndDate;

  ftbSchUrl = '/assets/data/schedule.json';
  weeklygames: WeeklyGames[];
  wklygmsUrl = '/assets/data/weeklygames.json';
  weekGamesAH: WeeklyGamesAH[] = [];
  wklygmsUrlAH = '/assets/data/weeklyahgms.json';
  weeksGmsChanged = new Subject<WeeklyGamesAH[]>();
  curWksGmsAH: WeeklyGamesAH[];
  cwTeams: WeeklyGmsAHNames;
  curWksGmsAHNames: WeeklyGmsAHNames[];

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
    new FootballTeams(27, 'Indianapolis Colts', 'IND'),
    new FootballTeams(28, 'Houston Texans', 'HOU'),
    new FootballTeams(29, 'Kansas City Chiefs', 'KC'),
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
    new FootballTeams(27, 'Indianapolis Colts', 'IND'),
    new FootballTeams(28, 'Houston Texans', 'HOU'),
    new FootballTeams(29, 'Kansas City Chiefs', 'KC'),
    new FootballTeams(30, 'Los Angeles Chargers', 'LAC'),
    new FootballTeams(31, 'Oakland Raiders', 'OAK'),
    new FootballTeams(32, 'Denver Broncos', 'DEN')
  ];

  constructor(private http: HttpClient,
              private formBuilder: FormBuilder,
              private datePipe: DatePipe) { }

  getWklyGmsAH() {
    return this.http.get<WeeklyGamesAH[]>(this.wklygmsUrlAH, {responseType: 'json'})
      .map((weeklyahgms) => {
        this.setWklyGamesAh(weeklyahgms);
        // console.log('innn service', this.weekGamesAH);
        return this.weekGamesAH;
      });
  }
  getAllwklyGmsAH() {
    return this.weekGamesAH;
  }

  setWklyGamesAh(wklyGamesAH: WeeklyGamesAH[]) {
    this.weekGamesAH = wklyGamesAH;
    // console.log('in service', this.weekGamesAH);
  }

  getWeeklyGames() {
    return this.http.get<WeeklyGames[]>(this.wklygmsUrl);
  }
  getTeams() {
    return this.footballteamlist.slice();
  }

  setScheduleType(type: any) {
    this.scheduleType = type;
  }

  getScheduleType() {
    return this.scheduleType;
  }

  getNFCteams() {
    return this.NFCTeamlist.slice();
  }

  getAFCteams() {
    return this.AFCTeamlist.slice();
  }

  getTeamsFile() {
    return this.http.get<FootballTeams[]>(this.teamUrl, {responseType: 'json'})
      .map((teams) => {
        this.teams = teams;
        // console.log('json', teams);
        return this.teams;
      });
  }

  getSeasonStart(startdate: Date) { }

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

  setFootballSch(fbSch: FootballSchedule[]) {
    this.footballsch = fbSch;
  }

  getFootballSchwk(index: number) { return this.footballsch[index]; }
  setCurWksGames(games: WeeklyGamesAH[]) {
    this.curWksGmsAH = games;
    this.curWksGmsAHNames = this.setWksGmsNames(); }

    getCurWksGames() {
    return this.curWksGmsAH;
  }

  setWksGmsNames() {
    const tms = this.footballteamlist.slice(0);
    const curWksTeamName: WeeklyGmsAHNames[] = [];
    this.curWksGmsAH.forEach((gm) => {
      const cwgm = +gm.game;
      const cwawayTmName = tms.find(x => x.teamnumber === gm.awayTeamNo).name;
      const cwhomeTName = tms.find(x => x.teamnumber === gm.homeTeamNo).name;
      const cwWksTeam = new WeeklyGmsAHNames(cwgm, cwawayTmName, cwhomeTName);
      curWksTeamName.push(cwWksTeam);
    });

    return curWksTeamName;
  }

  setWksGmsShortNms() {
    const tms = this.footballteamlist.slice(0);
    const curWksTmShrtName: WeeklyGmsAHNames[] = [];
    this.curWksGmsAH.forEach((gm) => {
      const cwgm = +gm.game;
      const cwawayTmShrtName = tms.find(x => x.teamnumber === gm.awayTeamNo).shortName;
      const cwhomeTmShrtName = tms.find(x => x.teamnumber === gm.homeTeamNo).shortName;
      const cwWksTeam = new WeeklyGmsAHNames(cwgm, cwawayTmShrtName, cwhomeTmShrtName);
      curWksTmShrtName.push(cwWksTeam);
    });

    return curWksTmShrtName;
  }

  addArrayFormGames(pickedTeams: any) {
    this.arrayForm = this.formBuilder.array([]);
    this.arrayForm.push(pickedTeams);

  }

  getArrayFromGames() {
    return this.arrayForm;
  }

  setScheduleSeasons(seasonEndDate: any) {
    this.schSeason1stEndDate = seasonEndDate;
  }
  /*
  getSchSeason1stEnddate() {
    return this.schSeason1stEndDate;
  } */

  getActualSeasonSchedule() {
    this.footballsch = [];
    const date = new Date(2018, 8, 3);
    const dateYr = date.getFullYear();
    const dateMth = date.getMonth() + 1;
    const dateDay = date.getDay() + 2;

    let startdate;
    let enddate;
    let resultdate;
    let week = 1;
    let dayIndex;

    let footballschedule2: FootballSchedule;

    for (dayIndex = 0; dayIndex < 63; dayIndex += 9 ) {
      startdate = this.datePipe.transform(dateYr + '-' + (dateMth) + '-' + (dateDay + dayIndex));
      enddate = this.datePipe.transform(dateYr + '-' + (dateMth) + '-' + (dateDay + (dayIndex + 4 )));
      resultdate = this.datePipe.transform(dateYr + '-' + (dateMth)  + '-' + (dateDay + (dayIndex + 8)));
      dayIndex -= 2;
      const footballschedule3 =  new FootballSchedule(week, startdate, enddate, resultdate);
      footballschedule2 = footballschedule3;
      this.addFootballSch(footballschedule2);
      week += 1 ;
    }

    const ddstart = new Date(startdate);
    const ddend = new Date(enddate);
    const ddresult = new Date(resultdate);
    let weekIndex = 2;
    const constIndex = 7;
    let dstart, dend, dresult;
    let footballschedule4;

    // this loop was created because the day increment rose over 100, which cause the datepipe to fail

    for (dayIndex = 9; dayIndex < 63; dayIndex += 9 ) {
      ddstart.setDate(ddstart.getDate() + (dayIndex - weekIndex));
      ddend.setDate(ddend.getDate() + (constIndex));
      ddresult.setDate(ddresult.getDate() + (constIndex));
      dstart = this.datePipe.transform(ddstart, 'MMM dd, yyyy');
      dend = this.datePipe.transform(ddend, 'MMM dd, yyyy');
      dresult = this.datePipe.transform(ddresult, 'MMM dd, yyyy');
      footballschedule4 =  new FootballSchedule(week, dstart, dend, dresult);
      footballschedule2 = footballschedule4;
      this.addFootballSch(footballschedule2);
      weekIndex += 7;
      dayIndex -= 2;
      week += 1;
    }
    this.setScheduleType('Actual');
  }

}
