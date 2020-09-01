import { Answer } from './answer.model';

export class Question {
    id: string;
    name: string;
    image: string;
    description: string;
    time: number;
    answer: Answer[];

    constructor(name: string, description: string, image: string, time: number, answer: Answer[]) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.time = time;
        this.answer = answer;
    }
}