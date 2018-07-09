import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';

import { IIssue } from '../shared/issue';
import { IRecipe } from '../shared/recipe';
import { DataService } from '../shared/data.service';
import { ConfirmDeleteComponent } from '../shared/confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-issue-edit',
  templateUrl: './issue-edit.component.html',
  styleUrls: ['./issue-edit.component.css']
})
export class IssueEditComponent implements OnInit {

  issue: IIssue;
  recipes: IRecipe[];
  pageTitle: string;
  public allMonths: any[] = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
  ];

  constructor(private _dataService: DataService,
    private _route: ActivatedRoute,
    private _router: Router,
    public dialog: MatDialog) { }

  ngOnInit() {
    const id = this._route.snapshot.paramMap.get('id');

    if (id === 'new') {
      this.issue = this.initializeIssue();
    } else {
      this._dataService.getIssue(id)
        .subscribe(data => {
          data.map(i => {
            const unwrappedObject = i.payload.val();
            this.issue = {
              id: id,
              issueTitle: unwrappedObject['issueTitle'],
              imageUrl: unwrappedObject['imageUrl'],
              month: unwrappedObject['month'],
              year: unwrappedObject['year']
            };
            this.onIssueRetrieved(this.issue);
          });
        });
    }

    // this._dataService.getRecipesByIssue(id)
    //   .subscribe(data => this.recipes = data);
  }

  onIssueRetrieved(issue: IIssue) {
    if (issue.id === 'new') {
      this.pageTitle = 'Add Issue';
    } else {
      this.pageTitle = `Edit Issue: ${issue.issueTitle}`;
    }
    this.issue = issue;
  }

  saveIssue() {
    this._dataService.saveIssue(this.issue);
    this._router.navigate([`/issues/${this.issue.id}`]);
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

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '250px',
      data: { objectToDelete: 'issue' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log(`About to delete this issue: ${this.issue.id}`);
        this._dataService.deleteIssue(this.issue.id);
        this._router.navigate(['/issues']);
      }
    });
  }
}
