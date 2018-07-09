import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { IssueListComponent } from './issue-list/issue-list.component';
import { IssueDetailComponent } from './issue-detail/issue-detail.component';
import { IssueEditComponent } from './issue-edit/issue-edit.component';
import { AuthGuardService } from './shared/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

const routes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: HomeComponent },
  { path: 'recipes', component: RecipeListComponent },
  { path: 'recipes/:id', component: RecipeDetailComponent },
  { path: 'recipes/:id/edit', component: RecipeEditComponent, canActivate: [AuthGuardService] },
  { path: 'issues', component: IssueListComponent },
  { path: 'issues/:id', component: IssueDetailComponent },
  { path: 'issues/:id/edit', component: IssueEditComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [
  RouterModule.forRoot(routes)
],
exports: [
  RouterModule
]
})

export class AppRoutingModule { }
