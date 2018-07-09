import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    password: ''
  };
  returnUrl: string;

  constructor(private _firebaseAuth: AngularFireAuth,
    private authService: AuthService,
    private router: Router,
  private route: ActivatedRoute) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  signInWithEmail() {
    this.authService.signInRegular(this.user.email, this.user.password)
    .then((res) => {

      this.router.navigateByUrl(this.returnUrl);
    })
    .catch((err) => console.log('Error: ' + err));
  }

}
