export class FootballTeams {
    constructor(public teamnumber: number, public name: string, public shortName: string) { }
}

export class Games {
    constructor(public week: number, public away: string, public home: string) {}
}

export class Game {
    constructor(public type: string, public teamNo: string, public name) {}
}

export class WeeklyGame {
    constructor(public week: number, public game: number, public type: string, public teamName) {}
}

export class WeeklyPicks {
    constructor(public week: number, public game: number,  public type: string, public teamName ) {}
}

export class WeeklyGames {
    constructor(public week: number, public game: number, public teamNo: number, public where: string) {}
}

export class WeeklyGamesAH {
    constructor (public week: number, public game: number, public awayTeamNo: number, public homeTeamNo: number) {}
}

export class WeeklyGmsAHNames {
    constructor (public game: number, public awayTeamName: string, public homeTeamName: string) {}
}
