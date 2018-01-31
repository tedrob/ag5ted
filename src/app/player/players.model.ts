export class Player {
    public playerName: string;
    public description: string;

    constructor(public name: string, public desc: string) {
        this.playerName = name;
        this.description = desc;
    }
}

