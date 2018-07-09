import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/observable';

import { IIssue } from '../shared/issue';
import { IRecipe } from '../shared/recipe';
import { DataService } from '../shared/data.service';
import { IRecipeIssue } from '../shared/recipeIssue';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.css']
})
export class IssueDetailComponent implements OnInit {

  issue: IIssue;
  recipes: IRecipe[];
  issueRecipes: IRecipeIssue[];
  id: string;

  constructor(private _dataService: DataService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this._route.snapshot.paramMap.get('id');

    this.getIssueRecipes();

    this._dataService.getIssue(this.id)
      .subscribe(data => {
        data.map(i => {
          const unwrappedObject = i.payload.val();
          this.issue = {
            id: this.id,
            issueTitle: unwrappedObject['issueTitle'],
            imageUrl: unwrappedObject['imageUrl'],
            month: unwrappedObject['month'],
            year: unwrappedObject['year']
          };
        });
      });
  }

  getIssueRecipes() {
    this._dataService.getissueRecipes(this.id)
      .subscribe(data => {
        this.recipes = data;
      });
  }
}
