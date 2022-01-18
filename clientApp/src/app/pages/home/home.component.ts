import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loggedIn : boolean = false
  constructor(private auth : AuthService, private router : Router) { }

  ngOnInit(): void {

    this.auth.loggedIn$.subscribe((isLoggedIn : boolean)=>{
      this.loggedIn = isLoggedIn;
    })
  }

  getStartedHandler() : void {
    if(this.loggedIn) {
      this.router.navigate(['/documents'])
    } else {
      this.router.navigate(['/login'])
    }
  }

}
