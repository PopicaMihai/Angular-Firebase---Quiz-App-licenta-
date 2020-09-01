import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionListComponent } from './questions/question-list/question-list.component';
import { QuestionDetailComponent } from './questions/question-detail/question-detail.component';
import { QuestionItemComponent } from './questions/question-list/question-item/question-item.component';
import { StudentsComponent } from './students/students.component';
import { StudentListComponent } from './students/student-list/student-list.component';
import { AnswerDetailComponent } from './questions/question-detail/answer-detail/answer-detail.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { QuestionEditComponent } from './questions/question-edit/question-edit.component';
import { SectionsComponent } from './questions/sections/sections.component';
import { WeeksComponent } from './questions/sections/weeks/weeks.component';
import { SectionsService } from './questions/sections/sections.service';
import { QuestionStartComponent } from './questions/question-start/question-start.component';
import { AdminAuthComponent } from './questions/admin-auth/admin-auth.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { HomePageComponent } from './user/homepage/homepage.component';
import { StudentFilterPipe } from './students/student-list/student-filter.pipe';
import { StudentPipePipe } from './students/student-list/student-pipe.pipe';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AdminAccountComponent } from './admin-account/admin-account.component';
import { AdminAuthGuard } from './questions/admin-auth/admin-auth.guard';

import { CountdownModule } from 'ngx-countdown';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';




const config = {
  apiKey: "AIzaSyDWE8rymnIhjAvwEyxS3Cif31ArwnZxeHc",
    authDomain: "testlicenta.firebaseapp.com",
    databaseURL: "https://testlicenta.firebaseio.com",
    projectId: "testlicenta",
    storageBucket: "testlicenta.appspot.com",
    messagingSenderId: "353492013742",
    appId: "1:353492013742:web:60a51cffc83145b788d33f",
    measurementId: "G-CTYL5HMB5L"
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    QuestionsComponent,
    QuestionListComponent,
    QuestionDetailComponent,
    QuestionItemComponent,
    StudentsComponent,
    StudentListComponent,
    AnswerDetailComponent,
    DropdownDirective,
    QuestionEditComponent,
    SectionsComponent,
    WeeksComponent,
    QuestionStartComponent,
    AdminAuthComponent,
    RegisterComponent,
    LoginComponent,
    HomePageComponent,
    StudentFilterPipe,
    StudentPipePipe,
    AdminAccountComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    CountdownModule
  ],
  providers: [AdminAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
