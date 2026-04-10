import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl:'sidenav.component.html'

})
export class SidenavComponent implements OnInit {
    _isAdmin : Boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this._isAdmin = true;
    let role = localStorage.getItem('roleID');
    if(role === "1"){
        this._isAdmin = true;
    }
  }

  logoutAction(){

    this.router.navigate(['/'])
  .then(() => {
    window.location.reload();
    localStorage.clear();
  });

  }

}
