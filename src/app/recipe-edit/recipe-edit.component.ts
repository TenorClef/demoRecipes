import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/observable';
import { MatDialog, MatDialogRef } from '@angular/material';

import { IRecipe } from '../shared/recipe';
import { DataService } from '../shared/data.service';
import { ConfirmDeleteComponent } from '../shared/confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipe: IRecipe;
  id: string;
  allRecipeTypes;
  pageTitle: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _dataService: DataService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.id = this._route.snapshot.paramMap.get('id');
    if (this.id === 'new') {
      this.initializeRecipe();
    } else {
      this.getRecipe();
    }

    this.allRecipeTypes = this._dataService.getRecipeTypes();
  }

  getRecipe() {
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
  }

  initializeRecipe() {
    this.recipe = {
      key: '',
      recipeTitle: '',
      imageUrl: '',
      recipeType: '',
      hasBeenMade: false
    };
  }

  onRecipeRetrieved(recipe: IRecipe): void {
    if (recipe.key === 'new') {
      this.pageTitle = 'Add Recipe';
    } else {
      this.pageTitle = `Edit Recipe: ${recipe.recipeTitle}`;
    }
    this.recipe = recipe;
  }

  saveRecipe(): void {
    this._dataService.saveRecipe(this.recipe);

    this._router.navigate([`/recipes/${this.id}`]);
  }

  cancel() {
    if (this.id === 'new') {
      this._router.navigate(['/recipes']);
    } else {
      this._router.navigate([`/recipes/${this.id}`]);
    }
  }

  deleteRecipe() {
    console.log('Deleting the recipe: ', this.id);
    this._dataService.deleteRecipe(this.id);
    this._router.navigate(['/recipes']);
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '250px', data: { objectToDelete: 'recipe' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteRecipe();
      }
    });
  }

}
