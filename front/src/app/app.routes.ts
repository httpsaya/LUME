import { Routes } from '@angular/router';
import { ProblemComponent } from './problem/problem.component';
import { OurWorkComponent } from './our-work/our-work.component';
import { AboutComponent } from './about/about.component';
import { GetInvolvedComponent } from './get-involved/get-involved.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path: '', component: HomeComponent, title: 'The Home page'},
    { path: 'problem', component: ProblemComponent, title: 'The Problem page' },
    { path: 'ourwork', component: OurWorkComponent, title: 'Our Work page' },
    { path: 'about', component: AboutComponent, title: 'About page' },
    { path: 'getinvolved', component: GetInvolvedComponent, title: 'Get Involved page' },
];
