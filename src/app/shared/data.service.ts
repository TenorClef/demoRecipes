import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';


import { IRecipe } from './recipe';
import { IIssue } from './issue';
import { IRecipeIssue } from './recipeIssue';

@Injectable()
export class DataService {
  public issues: IIssue[] = [];
  public recipes: IRecipe[] = [];
  public recipe: IRecipe = this.initializeRecipe();

  constructor(private _http: Http, private _db: AngularFireDatabase) { }

  getRecipes(issueId?: string) {
    if (issueId) {

    } else {
      this.recipes = [];
      this._db.list('/recipes').snapshotChanges()
        .subscribe(result => {
          result.map(r => {
            const unwrappedObject = r.payload.val()['content'];
            const recipe: IRecipe = {
              key: r.key,
              recipeTitle: unwrappedObject['recipeTitle'],
              imageUrl: unwrappedObject['imageUrl'],
              recipeType: unwrappedObject['recipeType'],
              hasBeenMade: unwrappedObject['hasBeenMade']
            };
            console.log(recipe);
            this.recipes.push(recipe);
          });
        });
    }
  }

  getRecipe(id: string) {
    return this._db.list(`/recipes/${id}`).snapshotChanges();
  }

  getRecipeTypes(): string[] {
    const recipeTypes: string[] = [
      'Appetizers',
      'Baked Goods',
      'Desserts',
      'Main Courses',
      'Side Dishes'
    ];
    return recipeTypes;
  }

  getIssues(recipeId?: number) {
    this.issues = [];
    if (recipeId) {
      // return this._http.get(this._baseUrl + 'Recipes/' + recipeId.toString() + '/Issues')
      //   .map(this.extractData)
      //   .catch(this.handleError);
    } else {
      this._db.list('/issues').snapshotChanges()
        .subscribe(result => {
          result.map(r => {
            const unwrappedObject = r.payload.val()['content'];
            const issue: IIssue = {
              id: r.key,
              imageUrl: unwrappedObject['imageUrl'],
              issueTitle: unwrappedObject['issueTitle'],
              month: unwrappedObject['month'],
              year: unwrappedObject['year']
            };
            this.issues.push(issue);
          });
        });
    }
  }

  getIssue(id: string) {
    return this._db.list(`/issues/${id}`).snapshotChanges();
  }

  saveRecipe(recipe: IRecipe): void {
    if (recipe.key === 'new') {
      // New recipe
      console.log(recipe);
      recipe.key = this._db.list('/recipes').push({ content: recipe }).key;
      console.log(recipe.key);
    }
      // To store the actual key in the id field, instead of the string 'new', the
      // recipe is saved again following the "if" block.
      this._db.object(`/recipes/${recipe.key}`).set({ content: recipe });
  }

  deleteRecipe(key) {
    this._db.object(`recipes/${key}`).remove();
    this._db.list(`recipeIssues/${key}/issues`).remove();
  }

  saveIssue(issue: IIssue) {
    if (issue.id === 'new') {
      // New issue
      issue.id = this._db.list('/issues').push({ content: issue }).key;
      // To store the actual key in the id field, instead of the string 'new', the
      // issue is saved again following the "if" block.
    }
      this._db.object(`issues/${issue.id}`).set({ content: issue });

  }

  deleteIssue(key) {
    this._db.object(`issues/${key}`).remove();
  }

  getissueRecipes(issueId: string): Observable<any[]> {
    const issueRecipes: any[] = [];
    this._db.list(`/issueRecipes/${issueId}/recipes`).snapshotChanges()
    .subscribe(data => {
      issueRecipes.length = 0;
      data.map(r => {
        const val = r.payload.val()['recipe'];
        const key = r.key;
        const recipe = {
          key: val['key'],
          hasBeenMade: val['hasBeenMade'],
          imageUrl: val['imageUrl'],
          recipeTitle: val['recipeTitle'],
          recipeType: val['recipeType']
        };
        const ir = {
          recipe: recipe,
          id: key
        };
        issueRecipes.push(ir);
      });
    });
    return Observable.of(issueRecipes);
  }

  getRecipeIssues(recipeId: string): Observable<any[]> {
    const recipeIssues: any[] = [];
    this._db.list(`/recipeIssues/${recipeId}/issues`).snapshotChanges()
    .subscribe(data => {
      recipeIssues.length = 0;
      data.map(i => {
        const v = i.payload.val()['issue'];
        const key = i.key;
        const issue = {
          id: v['id'],
          issueTitle: v['issueTitle'],
          imageUrl: v['imageUrl'],
          month: v['month'],
          year: ['year']
        };
        const ri = {
          issue: issue,
          id: key
        };
        recipeIssues.push(ri);
      });
    });
    return Observable.of(recipeIssues);
  }

  saveIssueRecipe(issue: IIssue, recipe: IRecipe) {
    // console.log('Issue: ', issue.id);
    // console.log('Recipe: ', recipeId);
    this._db.list(`/recipeIssues/${recipe.key}/issues`).push({ issue: issue });
    this._db.list(`issueRecipes/${issue.id}/recipes`).push({recipe: recipe});
    // const headers = new Headers({ 'Content-Type': 'application/json' });
    // const options = new RequestOptions({ headers: headers });
    // const url = `${this._baseUrl}IssueRecipe/${issueId.toString()}/${recipeId.toString()}`;
    // return this._http.post(url, ir, options);
  }

  deleteIssueRecipe(recipeIssueId: string, recipeId: string, issueId: string) {
    let issueRecipeKey: string;
    this._db.list(`issueRecipes/${issueId}/recipes`).snapshotChanges()
    .subscribe(data => {
      data.map(r => {
        if (r.payload.val()['recipe']['key'] === recipeId) {
          issueRecipeKey = r.key;
        }
      });
    });
    const recipeRef = this._db.list(`issueRecipes/${issueId}/recipes`);
    recipeRef.remove(issueRecipeKey);
    const issueRef = this._db.list(`recipeIssues/${recipeId}/issues`);
    issueRef.remove(recipeIssueId);
  }

  initializeRecipe(): IRecipe {
    return {
      key: '',
      recipeTitle: '',
      imageUrl: '',
      recipeType: '',
      hasBeenMade: false
    };
  }

  initializeIssue(): IIssue {
    return {
      id: 'new',
      issueTitle: '',
      month: 0,
      year: 0,
      imageUrl: ''
    };
  }

  private extractData(response: Response) {
    const body = response.json();
    // return body.data || {};
    return body;
  }

  private handleError(err: Response): Observable<any> {
    console.log(err.toString());
    return Observable.throw(err.json().error || 'Server error');
  }
}
