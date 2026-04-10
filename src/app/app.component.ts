import { Component, Renderer2 } from '@angular/core';
import { Router, Event as RouterEvent, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ghumao-web';
  allowaccess:boolean;
  constructor(private router :Router, private renderer: Renderer2) {

    router.events.subscribe((event: RouterEvent) => {

      if (event instanceof NavigationEnd) {
        console.info(this.router.url)

        if(this.router.url.includes("admin")){
          this.renderer.addClass(document.body, 'mat-typography' );
        }else{
          this.renderer.removeClass(document.body, 'mat-typography' );
        }

        if (this.router.url === '/login'|| this.router.url.includes("admin") ) {

          this.allowaccess = false;


        } else {
          this.allowaccess = true;

        }
      }
    })


  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.


  }
}
