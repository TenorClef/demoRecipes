import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/observable';

import { IRecipe } from '../shared/recipe';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: IRecipe[] = [];
  filteredRecipes: IRecipe[] = [];
  recipeTypes: string[];

  private _hasBeenMade?: boolean;
  get hasBeenMade() {
    return this._hasBeenMade;
  }
  set hasBeenMade(value) {
    this._hasBeenMade = value;
    this.searchRecipes();
  }

  private _recipeTypeFilter = '';
  get recipeTypeFilter(): string {
    return this._recipeTypeFilter;
  }
  set recipeTypeFilter(value: string) {
    this._recipeTypeFilter = value;
    this.searchRecipes();
  }

  private _searchText = '';
  get searchText(): string {
    return this._searchText;
  }
  set searchText(value: string) {
    this._searchText = value;
    this.searchRecipes();
  }

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this._dataService.getRecipes();
    this.recipes = this._dataService.recipes;
    this.filteredRecipes = this.recipes;
    this.recipeTypes =  this._dataService.getRecipeTypes();
  }

  searchRecipes() {
    this.filteredRecipes = this.recipes.filter((recipe: IRecipe) =>
      recipe.recipeTitle.toLocaleLowerCase().indexOf(this.searchText) !== -1
      && (this.recipeTypeFilter === '' || recipe.recipeType === this.recipeTypeFilter)
    );
  }


}
