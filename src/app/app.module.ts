import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataService } from './shared/data.service';
import { AppNavComponent } from './app-nav/app-nav.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { IssueListComponent } from './issue-list/issue-list.component';
import { IssueDetailComponent } from './issue-detail/issue-detail.component';
import { ConvertMonthToStringPipe } from './shared/convert-month-to-string.pipe';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeIssueComponent } from './recipe-issue/recipe-issue.component';
import { IssueEditComponent } from './issue-edit/issue-edit.component';
import { ConfirmDeleteComponent } from './shared/confirm-delete/confirm-delete.component';
import { AuthService } from './shared/auth.service';
import { AuthGuardService } from './shared/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { IssueRecipeComponent } from './issue-recipe/issue-recipe.component';
import { HomeComponent } from './home/home.component';

const firebaseConfig = {
  apiKey: 'AIzaSyCxzVWnd59mOrvTS-zHQgFxzfPm1VlE5NY',
  authDomain: 'recipesdemo-ba6df.firebaseapp.com',
  databaseURL: 'https://recipesdemo-ba6df.firebaseio.com',
  projectId: 'recipesdemo-ba6df',
  storageBucket: '',
  messagingSenderId: '460958215392'
};


@NgModule({
  declarations: [
    AppComponent,
    AppNavComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    IssueListComponent,
    IssueDetailComponent,
    ConvertMonthToStringPipe,
    RecipeEditComponent,
    RecipeIssueComponent,
    IssueEditComponent,
    ConfirmDeleteComponent,
    LoginComponent,
    IssueRecipeComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  entryComponents: [
    ConfirmDeleteComponent
  ],
  providers: [
    DataService,
    AngularFireDatabaseModule,
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
