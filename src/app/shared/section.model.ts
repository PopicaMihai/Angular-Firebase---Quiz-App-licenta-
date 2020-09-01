import { Week } from './weeks.model';

export class Section {
    name: string;
    weeks: Week[];

    constructor( name: string, weeks: Week[]) {
        this.name = name;
        this.weeks = weeks;
    }
}