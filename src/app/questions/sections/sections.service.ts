import { Injectable } from '@angular/core';
import { Section } from 'src/app/shared/section.model';
import { Week } from 'src/app/shared/weeks.model';
import { Question } from 'src/app/shared/question.model';
import { QuestionService } from '../question.service';
import { AngularFireDatabase } from '@angular/fire/database'
import { AngularFirestoreModule, AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';




@Injectable({
    providedIn: 'root'
})
export class SectionsService {
    section?: Section;
    nume = "Heyo"
    sectiInfo: any;
    saptamaniInfo: any
    name: string;
    sectii2;
    weeks2 = [];
    sectionss: Section[] = [];
    sectionFB : Observable<Section[]>;
    sectionRef: AngularFirestoreCollection<Week>;
    collection: AngularFirestoreCollection;

    static sectionSubject = new BehaviorSubject([]);
    constructor(private questionService: QuestionService, public afs: AngularFirestore, private db: AngularFireDatabase) {
        
    }

    sections: Section[] = [
        // new Section('Automatica-Romana', this.generateWeeks()),
        // new Section('Informatica-Romana', this.generateWeeks()),
        // new Section('Automatica-Engleza', this.generateWeeks()),
        // new Section('Informatica-Engleza', this.generateWeeks())
    ];

    getSections() {
        return [...this.sections];
    }

    getObject() { 
        this.db.list('/').valueChanges().subscribe(data => {
            const sectionNames = Object.keys(data[0]);
            const sections = [];

            for(let i=0; i < sectionNames.length; i++) {
                sections.push(new Section(sectionNames[i], this.getWeeksFromData(data[0][sectionNames[i]])))
            }
            SectionsService.sectionSubject.next(sections);
        })
    }

    getWeeksFromData(dictionaryWeek) {
        let weeks = []
        const weekNames = Object.keys(dictionaryWeek);
        for(let k = 0; k < weekNames.length; k++) {
            
            weeks.push(new Week(weekNames[k], this.getQuestionsFromData(dictionaryWeek[weekNames[k]])))
        }
        return weeks;
    }

    getQuestionsFromData(dictionaryQuestion) {
        let questions = [];
        const questionsNames = Object.keys(dictionaryQuestion);
        for(let y = 0; y < questionsNames.length; y++) {
            
            questions.push({
                id: questionsNames[y], 
                name:dictionaryQuestion[questionsNames[y]].name,
                description: dictionaryQuestion[questionsNames[y]].description,
                image: dictionaryQuestion[questionsNames[y]].image,
                time: dictionaryQuestion[questionsNames[y]].time,
                answer: dictionaryQuestion[questionsNames[y]].answer
            });
        }
        return questions;
    }

    



    generateWeeks() {
        const weeks = [];
        for( let i = 1; i <= 14; i++) {
            weeks.push(new Week(`Saptamana-${i}`, this.questionService.getQuestions()))
        }
        return weeks;
    }
}