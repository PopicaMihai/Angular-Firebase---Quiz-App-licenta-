import { NgModule } from '@angular/core';
import { Routes, RouterModule, ChildrenOutletContexts } from '@angular/router';
import { QuestionsComponent } from './questions/questions.component';
import { StudentsComponent } from './students/students.component';
import { QuestionDetailComponent } from './questions/question-detail/question-detail.component';
import { QuestionEditComponent } from './questions/question-edit/question-edit.component';
import { SectionsComponent } from './questions/sections/sections.component';
import { WeeksComponent } from './questions/sections/weeks/weeks.component';
import { QuestionListComponent } from './questions/question-list/question-list.component';
import { QuestionStartComponent } from './questions/question-start/question-start.component';
import { AdminAuthComponent } from './questions/admin-auth/admin-auth.component';
import { AdminAuthGuard } from './questions/admin-auth/admin-auth.guard';
import { StudentListComponent } from './students/student-list/student-list.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { HomePageComponent } from './user/homepage/homepage.component';
import { AdminAccountComponent } from './admin-account/admin-account.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'auth', component: AdminAuthComponent },
  { path: 'questions', component: QuestionsComponent,   children: [
    { path: '', component: SectionsComponent, children: [ 
      { path: ':id', component: WeeksComponent, children: [
        { path: ':id', component: QuestionStartComponent, children: [
          { path: 'new', component: QuestionEditComponent },
          { path: ':id', component: QuestionDetailComponent },
          { path: ':id/edit', component: QuestionEditComponent }
        ]}
      ]} 
    ]}
    
  ]},
  { path: 'students', component: StudentsComponent, children: [
     { path: 'id', component: StudentListComponent }
  ]},
  { path: 'account', component: AdminAccountComponent},
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
