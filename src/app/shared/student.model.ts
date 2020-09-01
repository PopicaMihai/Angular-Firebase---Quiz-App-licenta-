import { StudentWeeks } from './studentWeeks.mode';

export class Student {
    id?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    group?: any;
    phone?: any;
    section?: any;
    weeks?: StudentWeeks;
    medie?: number;
    online?: boolean;
    prezente?: number;
    notaFinala?: number;


    constructor(email: string, firstName: string, lastName: string, group: any, phone: any,section: any, weeks: StudentWeeks ) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.group = group;
        this.phone = phone;
        this.section = section;
        this.weeks = weeks;
    };
}