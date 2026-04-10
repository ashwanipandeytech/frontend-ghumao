import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Category } from './../../../../models/category.model';
import { ApiService } from 'src/app/services/api.service';
import { AdminService } from 'src/app/admin/services/admin.service';

@Component({
  selector: 'app-manage-packagetypes',
  templateUrl: './manage-packagetypes.component.html',
  styleUrls: ['./manage-packagetypes.component.scss']
})
export class ManagePackagetypesComponent implements OnInit {
  categories: Category[];

  constructor(private apiService: ApiService, private adminApiService: AdminService) { }

  ngOnInit(): void {
      this.loadCategories();
  }

  loadCategories(){
      this.apiService.callApiWithBearer('','category').subscribe((response:any) => {
        if(response.success && response.data && response.data!=''){
          this.categories = response.data;
        }else{
          this.categories = [];
        }

      });
  }

  deleteCategoryAction(category){
      let requestPayload={
        CategoryId:category.CategoryId,

      }

        let token = localStorage.getItem('token');
        this.apiService.callApiWithBearer(requestPayload, 'category/remove').subscribe(
            (result:any) => {
              if(result.success){
                this.loadCategories();
              }

            }
        );
  }

  deactivateCategoryAction(category){
    let requestPayload={
      CategoryId:category.CategoryId,
      IsActive:'NO',
    }
      // Get Stored token
      let token = localStorage.getItem('token');
      this.apiService.callApiWithBearer(requestPayload, 'category/statusupdate').subscribe(
          (result:any) => {
            if(result.success){
              this.loadCategories();
            }

          }
      );
  }

  activateCategoryAction(category){
    let requestPayload={
      CategoryId:category.CategoryId,
      IsActive:'Yes',
    }


      this.apiService.callApiWithBearer(requestPayload, 'category/statusupdate').subscribe(
        (result:any) => {
          if(result.success){
            this.loadCategories();
          }

        }
      );
  }
}
