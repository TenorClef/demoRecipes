import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';

import { IIssue } from '../shared/issue';
import { IRecipeIssue } from '../shared/recipeIssue';
import { DataService } from '../shared/data.service';
import { IRecipe } from '../shared/recipe';

@Component({
  selector: 'app-recipe-issue',
  templateUrl: './recipe-issue.component.html',
  styleUrls: ['./recipe-issue.component.css']
})
export class RecipeIssueComponent implements OnInit {

  recipeIssues: IRecipeIssue[] = [];
  allIssues: IIssue[];
  allIssuesFiltered: IIssue[];
  @Input() recipe: IRecipe;

  private _newIssueText: string;
  get newIssueText(): string {
    return this._newIssueText;
  }
  set newIssueText(value: string) {
    this._newIssueText = value;
    this.allIssuesFiltered = this.filterIssues();
  }


  newIssue: IIssue;
  newIssueImageUrl: string;

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this._dataService.getIssues();
    this.allIssues = this._dataService.issues;
    this.getRecipeIssues();
  }

  private getRecipeIssues() {
    this.recipeIssues = [];
    this._dataService.getRecipeIssues(this.recipe.key)
      .subscribe(data => {
        this.recipeIssues = data;
      });
  }

  filterIssues(): IIssue[] {
    return this.allIssues.filter(
      issue => issue.issueTitle.toLocaleLowerCase().indexOf(this.newIssueText.toLocaleLowerCase()) >= 0
    );
  }

  findIssue(): void {
    if (this.newIssueText !== '') {
      this.newIssue = this.allIssues.filter(i => i.issueTitle === this.newIssueText)[0];
      if (this.newIssue) {
        this.newIssueImageUrl = '/assets/images/issues/' + this.newIssue.imageUrl;
      }
    }
  }

  onIssueSelected(selectedIssue: IIssue) {
    this.newIssue = selectedIssue;
    this.newIssueImageUrl = '/assets/images/issues/' + this.newIssue.imageUrl;
  }

  onBtnClick(): void {
    this._dataService.saveIssueRecipe(this.newIssue, this.recipe);
    // this.recipeIssues.push(this.newIssue);
    this.clearSelectedIssue();
      // .subscribe(() => {
      //   this.recipeIssues.push(this.newIssue);
      //   // this.newIssue = undefined;
      //   this.newIssueImageUrl = '';
      //   this.newIssueText = '';
      // });
  }

  removeIssue(recipeIssueId: string, issueId: string) {
    this._dataService.deleteIssueRecipe(recipeIssueId, this.recipe.key, issueId);
  }

  clearSelectedIssue() {
    this.newIssueText = '';
    this.newIssue = null;
    this.newIssueImageUrl = '';
  }
}
