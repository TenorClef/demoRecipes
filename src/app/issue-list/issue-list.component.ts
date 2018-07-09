import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { IIssue } from '../shared/issue';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit {

  issues: IIssue[];

  constructor(private _dataService: DataService) {}

  ngOnInit() {
    this._dataService.getIssues();
    this.issues = this._dataService.issues;
  }

}
