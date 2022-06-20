import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StudentsComponent } from './students/students.component';
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {UserComponent} from "./user/user.component";
import {AdminComponent} from "./admin/admin.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import { httpInterceptorProviders } from './auth/auth-interceptor';
import {RoleGuard} from "./guards/role.guard";
import {SubjectsComponent} from "./subjects/subjects.component";
import { GradedTaskComponent } from './graded-task/graded-task.component';
import { GradeComponent } from './grade/grade.component';
import { StudentComponent } from './student/student.component';
import { SubjectgradesComponent } from './subjectgrades/subjectgrades.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'subjects', component: SubjectsComponent },
  { path: 'user', component: UserComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_USER','ROLE_ADMIN'] },},
  { path: 'subjectGrades', component: SubjectgradesComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_USER','ROLE_ADMIN'] },},
  {path: 'user/:id', component: GradedTaskComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_USER','ROLE_ADMIN'] }},
  {path: 'user/:id/:name' ,component: GradeComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_USER','ROLE_ADMIN'] }},
  { path: 'student', component: StudentComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_ADMIN'] },},
  { path: 'admin', component: AdminComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_ADMIN'] },},
  { path: 'auth/login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StudentsComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    AdminComponent,
    SubjectsComponent,
    GradedTaskComponent,
    GradeComponent,
    StudentComponent,
    SubjectgradesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
