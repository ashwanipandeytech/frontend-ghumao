import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { UtilityService } from '../shared/utility.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  MenuList: any;
  slug: string;
  iSAboutUs=false;


  constructor(private route: ActivatedRoute, private router: Router,public utilityservice:UtilityService,private apiService:ApiService) { }

  ngOnInit(): void {
    let slug = this.router.url.split('/');
    console.info(slug[1])
    if(slug[1]){
      this.iSAboutUs=true;
    }
    if(slug && slug[2]){
      this.slug=slug[2]
    }
   // //console.info(slug[2])
    this.apiService.callApiWithBearer('', 'category/list',true).subscribe((res: any) => {
      if(res.success && res.data!=''){
        this.MenuList=res.data;

      this.MenuList.map(item=>{
        this.recurse(item)
      })
     // //console.info(this.MenuList)

      }else{
        this.MenuList=[]
      }



     })
  }






 recurse(node) {
    if (node.Cities != undefined && node.Cities != '') {
      //  //console.info(node.value)
        node.citiesList=JSON.parse(node.Cities)

    }
    if (node.children_recursive) {
        for (var i = 0; i < node.children_recursive.length; i++) {

            this.recurse(node.children_recursive[i]);
        }
    }

}

  goToPage(url: any,reload=false) {
    this.router.navigateByUrl(url)
    this.router.navigate([url]).then(result => {

      });
  }
}
