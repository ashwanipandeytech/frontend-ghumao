import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-title',
  template: `
    <div class="row page-title">
        <div class="col-md-12 py-5">
          <table class="w-100">
            <tr>
              <td>
                <h3 class="float-start m-0 text-uppercase">{{title}}</h3>
              </td>
              <td text-align="Center" colspan="4">
                <p class="user-name">Welcome ! {{_user}}</p>
              </td>
              <td>
                <div class="float-end">
                    <a *ngIf="url" class="btn btn-secondary me-3 mr-3" routerLink="{{url}}"><i class="fas {{icon}} me-2"></i> {{button}}</a>
                    <a class="btn btn-outline-secondary" routerLink="/" role="button"  target="_blank">View Website <i class="fas fa-external-link-alt ms-2"></i></a>
                </div>
              </td>
            </tr>
          </table>
        </div>
    </div>
  `,
  styles: [
  ]
})
export class PageTitleComponent implements OnInit {
    @Input() title: string;
    @Input() icon: string;
    @Input() button: string;
    @Input() url: string;
    _user : String;

    constructor() {}

    ngOnInit(): void {
      this._user = localStorage.getItem('name');;
    }

}
