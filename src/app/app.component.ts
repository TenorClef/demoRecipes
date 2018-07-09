import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cook\'s Illustrated';

  itemValue = '';
  items: Observable<any[]>;

  constructor(private router: Router, private db: AngularFireDatabase) {
    this.items = db.list('issues').valueChanges();
  }


}
