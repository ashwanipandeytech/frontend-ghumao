import { HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { AdminService } from 'src/app/admin/services/admin.service';
import { Category } from 'src/app/models/category.model';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';



import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { TreeNode } from '../../../../models/model';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-edit-categories',
  templateUrl: `./edit-categories.component.html`,

  styles: [`
  @import '@angular/material/prebuilt-themes/indigo-pink.css';
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


  }
  .ng-untouched{
    border:unset;
  }
      `
  ],
  encapsulation: ViewEncapsulation.None
})
export class EditCategoriesComponent implements OnInit {

  treeControl = new NestedTreeControl<TreeNode>(node => node.children_recursive);
  dataSource = new MatTreeNestedDataSource<TreeNode>();
  selectedParent: any;
  selectedParentStatus: any;
  citiesList: any;

  hasChild (_: number, node: TreeNode): boolean {
    return (node.children_recursive.length > 0) ?    true :     false;
   }
    category : Observable<Category>;
    uploadImage: Boolean;
    imageUploadForm: FormGroup;
    imageSrc: any;
    catKeys: any;

    editCategoryFrom: FormGroup;
    keysOptions: Array<any> =[
        {name: "New", value: 'New'},
        {name: 'Popular', value: 'Popular'},
        {name: "Special", value: 'Special'},
        {name: "Domestic", value: 'Domestic'},
        {name: "Pilgrimage", value: 'Pilgrimage'},
        {name: "International", value: 'International'},
        {name: "Fixed-Departure", value: 'Fixed-Departure'}
    ];

    error:Boolean;
    errorMessage:String;
    categoryId: string;

    constructor(private adminApiService: AdminService,private apiService:ApiService, private router: Router, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.categoryId  = this.route.snapshot.paramMap.get('categoryId');
        this.selectedParentStatus=[];
        this.initEditCategoryForm();
        this.intiImageUploadForm();
        this.error = false;
        this.uploadImage = false;
    }

    intiImageUploadForm() {
        this.imageUploadForm = new FormGroup({
            Image: new FormControl(''),
            FileSource: new FormControl('')
        });
    }

    initEditCategoryForm(){
        this.editCategoryFrom = new FormGroup({
            CategoryName: new FormControl('', [Validators.required, Validators.minLength(3)]),
            CategorySlug: new FormControl(''),
            CategoryTitle:new FormControl(''),
            isMenu:new FormControl(false),
            IsActive:new FormControl(false),
            Description: new FormControl(''),
            Image: new FormControl('')
        });
        let token = localStorage.getItem('token');
        let requestPayload={
          CategoryId : this.categoryId

        }
        this.apiService.callApiWithBearer(requestPayload,'category/details').subscribe((response:any) => {
           // this.editCategoryFrom.patchValue(response.data, this.imageSrc = response.data.Image);

            this.editCategoryFrom.patchValue({
              CategoryName:response.data.CategoryName,
              CategorySlug:response.data.CategorySlug,
              CategoryTitle:response.data.CategoryTitle,
              isMenu:(response.data.isMenu=='Yes')?true:false,
              IsActive:(response.data.IsActive=='Yes')?true:false,
              Description:response.data.Description,


            })
            this.imageSrc = environment.CATEGORY_FOLDER+response.data.Image+"?v="+Math.random();
            this.selectedParent=response.data.parent_id;
            if(response.data.Cities==''){
              this.citiesList=[]
            }else{
              this.citiesList=JSON.parse(response.data.Cities)
            }




            this.apiService.callApiWithBearer('', 'category/list',true).subscribe((res: any) => {
              if(res.success && res.data!=''){
                this.dataSource.data=res.data
                this.selectedParentStatus[this.selectedParent] = true;
              }else{
                this.dataSource.data=[]
              } });
        });
    }
    addMore(type) {
      if (type == 'City') {

        this.citiesList.push({
          "city": '',
        })
      }
    }


    remove(type,index) {
      if (type == 'City') {
        this.citiesList.splice(index,1)
      }
    }


    changeParent(name, status) {

      this.selectedParent = (status) ? name : '';

      console.info( this.selectedParent)

    }


    editCategoryAction(){
      this.editCategoryFrom.markAsUntouched();

      if(this.uploadImage && this.imageUploadForm.get('FileSource').value==''){
        this.errorMessage = 'Please Enter Category Banner Image';
        this.error = true;
        return false;

      }

      else if(this.editCategoryFrom.get('CategoryName').value==''){
        this.errorMessage = 'Please Enter Category Name';
        this.error = true;
        return false;

      }
      else if(this.editCategoryFrom.get('CategorySlug').value==''){
        this.errorMessage = 'Please Enter Category Slug';
        this.error = true;
        return false;

      }
      else if(this.editCategoryFrom.get('CategoryTitle').value==''){
        this.errorMessage = 'Please Enter Category Title';
        this.error = true;
        return false;

      }


      this.editCategory();return false
        if (this.editCategoryFrom.valid) {
            if(this.uploadImage) {
                this.imageUpload()
            }
            else {
                this.editCategoryFrom.patchValue({
                    Image: $('#ImageUrl').val().toString()
                });

                this.editCategory();
            }
        } else {
            this.editCategoryFrom.markAsTouched();
            this.error = true;
            this.errorMessage = 'Form Validation Error';
        }
    }

    editCategory(){
        // Get Stored token


        var formData = new FormData();

        formData.append('CategoryId', this.categoryId);
        formData.append('CategoryName', this.editCategoryFrom.get('CategoryName').value);
        formData.append('CategoryTitle', this.editCategoryFrom.get('CategoryTitle').value);
        formData.append('CategorySlug', this.editCategoryFrom.get('CategorySlug').value);
        formData.append('Description', this.editCategoryFrom.get('Description').value);
        formData.append('IsActive', (this.editCategoryFrom.get('IsActive').value)?'Yes':'No');
        formData.append('isMenu', (this.editCategoryFrom.get('isMenu').value)?'Yes':'No');
        formData.append('CreatedBy', '0');
        formData.append('StartingPrice', '0');

        if(this.citiesList!=''){
          formData.append('Cities',JSON.stringify(this.citiesList));
        }



        formData.append('parent_id', this.selectedParent);
        if(this.uploadImage && this.imageUploadForm.get('FileSource').value && this.imageUploadForm.get('FileSource').value!=''){
          formData.append('Image', this.imageUploadForm.get('FileSource').value);
        }


        this.apiService.callApiWithBearer(formData, 'category/update').subscribe(
            (result:any) => {
                if(result.success){
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Category Updated!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setTimeout(() => {
                        this.router.navigate(['/admin/categories']);
                    }, 1800);
                }
                this.error = false;
            },
            error => {
                this.error = true;
                this.errorMessage = error.error;
            }
        );
    }

    resetError(){
        this.error = false;
        this.errorMessage = '';
    }

    imageUpload() {
        // Get Stored token
        let token = localStorage.getItem('token');

        if (this.imageUploadForm.valid) {
            var formData = new FormData();
            formData.append('Image', this.imageUploadForm.get('FileSource').value);

            this.adminApiService.uploadImage(formData, token).subscribe(
                result => {
                    if (result.type === HttpEventType.Response) {
                        this.editCategoryFrom.patchValue({
                            Image: result.body.toString()
                        });

                        this.editCategory();
                    }

                    if (result.type === HttpEventType.UploadProgress) {
                        const percentDone = Math.round(100 * result.loaded / result.total);
                        //console.log('Progress ' + percentDone + '%');
                    }
                },
                error => {
                    this.error = true;
                    this.errorMessage = error.error;
                }
            );
        } else {
            this.imageUploadForm.markAsTouched();
            this.error = true;
            this.errorMessage = 'Image not selected! Please select the image.';
        }
    }

    onFileChange(event) {
        if (event.target.files.length > 0) {
           // this.uploadImage = true;
            const file = event.target.files[0];

            this.imageUploadForm.patchValue({
                FileSource: file
            });

            const reader = new FileReader();
            reader.onload = e => this.imageSrc = reader.result;
            reader.readAsDataURL(file);
        }
    }



    checkboxAction(event,type){


      if(type=='isMenu'){


      }
      else if(type=='IsActive'){

      }

    }



    enableDisableImageUploadAction(){
        if($('#enableUpload').prop('checked')){
            $('#uploadImageCard').show();
            $('#uploadUrlCard').hide();
            this.uploadImage = true;
        } else {
            $('#uploadImageCard').hide();
            $('#uploadUrlCard').show();
            this.uploadImage = false;
        }
    }
}
