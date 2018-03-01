export class FootballTeams {
    constructor(public teamnumber: number, public name: string, public shortName: string) { }
}

export class Games {
    constructor(public week: number, public away: string, public home: string) {}
}

export class Game {
    type = '';
    teamNo = '';
    name = '';
}
