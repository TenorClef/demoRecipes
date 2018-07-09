import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DataService } from '../shared/data.service';
import { IRecipe } from '../shared/recipe';
import { IIssue } from '../shared/issue';
import { IRecipeIssue } from '../shared/recipeIssue';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: IRecipe;
  recipeIssues: IRecipeIssue[];
  id;

  constructor(private _dataService: DataService,
    private _route: ActivatedRoute,
    private _db: AngularFireDatabase,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.id = this._route.snapshot.paramMap.get('id');
    this._dataService.getRecipe(this.id)
    .subscribe(data => {
      data.map(r => {
        const unwrappedObject = r.payload.val();
        this.recipe = {
          key: this.id,
          recipeTitle: unwrappedObject['recipeTitle'],
          recipeType: unwrappedObject['recipeType'],
          imageUrl: unwrappedObject['imageUrl'],
          hasBeenMade: unwrappedObject['hasBeenMade']
        };
      });
    });

    this.getRecipeIssues();
  }

  private getRecipeIssues() {
    this.recipeIssues = [];
    this._dataService.getRecipeIssues(this.id)
      .subscribe(data => {
        this.recipeIssues = data;
      });
  }
}
