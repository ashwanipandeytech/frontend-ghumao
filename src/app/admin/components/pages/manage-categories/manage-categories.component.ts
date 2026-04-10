import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Category } from './../../../../models/category.model';
import { ApiService } from 'src/app/services/api.service';
import { AdminService } from 'src/app/admin/services/admin.service';

import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { TreeNode } from '../../../models/model';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',


  styles: [`
  @import '@angular/material/prebuilt-themes/indigo-pink.css';
  .tree-invisible {
    display: none;
}

.category-tree ul,
.category-tree li {
    margin-top: 0;
    margin-bottom: 4px;
    list-style-type: none;
}

.mat-tree {
    width: 100%;
    list-style: none;
    .nodeParent {
        margin-bottom: 5px;
        border: 1px solid var(--theme-color-2);
        justify-content: space-between;
        padding-right: 10px;
        cursor: auto;
        .nodetext {
            display: flex;
            align-items: center;
            .material-icons {
                cursor: pointer;
            }
        }

    }
    .sequence{
        cursor: move !important;
      }
    .nodeChildrow {
        margin-bottom: 5px;
        border: 1px solid var(--theme-color-2);
        justify-content: space-between;
        padding-left: 10px;
        padding-right: 10px;
    }
}

.fliterNode {
    padding: 0 0 0 15px;
    border: 1px solid var(--theme-color-2);
    margin-bottom: 25px;
    .nodeSingle {
        height: 300px;
        overflow: auto;
        // total width
        &::-webkit-scrollbar {
            background-color: var(--theme-color-3);
            width: 8px
        }
        // background of the scrollbar except button or resizer
        &::-webkit-scrollbar-track {
            background-color: var(--theme-color-3);
        }
        // scrollbar itself
        &::-webkit-scrollbar-thumb {
            background-color: #babac0;
            border-radius: 16px;
            border: 1px solid var(--theme-color-3);
        }
        // set button(top and bottom of the scrollbar)
        &::-webkit-scrollbar-button {
            display: none
        }
        .mat-tree-node {
            min-height: 30px;
        }
        ul {
            list-style: none;
        }
    }
}`
  ],
  encapsulation: ViewEncapsulation.None,
})
export class ManageCategoriesComponent implements OnInit {
    categories: Category[];

    treeControl = new NestedTreeControl<TreeNode>(node => node.children_recursive);
    dataSource = new MatTreeNestedDataSource<TreeNode>();
    selectedParent: any;
    selectedParentStatus: any;

    hasChild (_: number, node: TreeNode): boolean {
      return (node.children_recursive.length > 0) ?    true :     false;
     }

    constructor(private apiService: ApiService, private adminApiService: AdminService) { }

    ngOnInit(): void {
        this.loadCategories();
    }

    loadCategories(){
      let requestPayload={
        for:'admin'
      }
        this.apiService.callApiWithBearer('','category/list').subscribe((response:any) => {
          if(response.success && response.data && response.data!=''){
            this.categories = response.data;
            this.dataSource.data = response.data;
          }else{
            this.categories = [];
            this.dataSource.data = [];
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
