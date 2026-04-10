import { HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from 'src/app/services/api.service';
import { AdminService } from 'src/app/admin/services/admin.service';

import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { TreeNode } from '../../../../models/model';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
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
export class AddCategoriesComponent implements OnInit {

  treeControl = new NestedTreeControl<TreeNode>(node => node.children_recursive);
  dataSource = new MatTreeNestedDataSource<TreeNode>();
  selectedParent: any;
  selectedParentStatus: any;
  citiesList: any=[];

  hasChild (_: number, node: TreeNode): boolean {
    return (node.children_recursive.length > 0) ?    true :     false;
   }

    uploadImage: Boolean;
    imageUploadForm: FormGroup;
    imageSrc: any;

    addCategoryFrom: FormGroup;
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

    constructor(private adminApiService: AdminService,private apiService:ApiService, private router: Router) {}

    ngOnInit(): void {
      this.selectedParentStatus=[]
        this.initAddCategoryForm();
        this.intiImageUploadForm();
        this.error = false;
        this.uploadImage = true;
    }

    intiImageUploadForm() {
        this.imageUploadForm = new FormGroup({
            Image: new FormControl(''),
            FileSource: new FormControl('')
        });
    }

    initAddCategoryForm(){
        this.addCategoryFrom = new FormGroup({
            CategoryName: new FormControl('', [Validators.required, Validators.minLength(3)]),
            CategorySlug: new FormControl(''),
            Description: new FormControl(''),
            CategoryTitle:new FormControl(''),
            isMenu:new FormControl(false),
            IsActive:new FormControl(false),
          //  StartingPrice:new FormControl(0),
            Image: new FormControl('')
        });


        this.apiService.callApiWithBearer('', 'category/list',true).subscribe((res: any) => {
          if(res.success && res.data!=''){
            this.dataSource.data=res.data
          }else{
            this.dataSource.data=[]
          }



         })
    }

    changeParent(name, status) {

      this.selectedParent = (status) ? name : '';

      console.info( this.selectedParent)

    }

    addCategoryAction(){



if(this.uploadImage && this.imageUploadForm.get('FileSource').value==''){
  this.errorMessage = 'Please Enter Category Banner Image';
  this.error = true;
  return false;

}

else if(this.addCategoryFrom.get('CategoryName').value==''){
  this.errorMessage = 'Please Enter Category Name';
  this.error = true;
  return false;

}
else if(this.addCategoryFrom.get('CategorySlug').value==''){
  this.errorMessage = 'Please Enter Category Slug';
  this.error = true;
  return false;

}
else if(this.addCategoryFrom.get('CategoryTitle').value==''){
  this.errorMessage = 'Please Enter Category Title';
  this.error = true;
  return false;

}





        if (this.addCategoryFrom.valid) {
          // this.imageUpload()
          this.addCategory();
            // if(this.uploadImage) {
            //     this.imageUpload()
            // }
            // else {
            //     this.addCategoryFrom.patchValue({
            //         Image: $('#ImageUrl').val().toString()
            //     });

            //     this.addCategory();
            // }
        } else {
            this.addCategoryFrom.markAsTouched();
            this.error = true;
            this.errorMessage = 'Form Validation Error';
        }
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

    addCategory(){



        var formData = new FormData();
        formData.append('CategoryName', this.addCategoryFrom.get('CategoryName').value);
        formData.append('CategorySlug', this.addCategoryFrom.get('CategorySlug').value);
        formData.append('CategoryTitle', this.addCategoryFrom.get('CategoryTitle').value);

        formData.append('Description', this.addCategoryFrom.get('Description').value);
        formData.append('IsActive', (this.addCategoryFrom.get('IsActive').value)?'Yes':'No');
        formData.append('isMenu', (this.addCategoryFrom.get('isMenu').value)?'Yes':'No');
        formData.append('parent_id', this.selectedParent);
        formData.append('CreatedBy', '0');
        formData.append('StartingPrice', '0');
        //formData.append('Image', '0');
       // console.info( this.addCategoryFrom.value);return false
        if(this.uploadImage && this.imageUploadForm.get('FileSource').value && this.imageUploadForm.get('FileSource').value!=''){
          formData.append('Image', this.imageUploadForm.get('FileSource').value);
        }
        if(this.citiesList!=''){
          formData.append('Cities',this.citiesList);
        }



     //   console.info(formData);return false

        this.apiService.callApiWithBearer(formData, 'category/add').subscribe(
            (result:any) => {
                //console.log(result);
                if(result.success){
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Category Created!',
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
       // return false;

        if (this.imageUploadForm.valid) {
            var formData = new FormData();
            formData.append('Image', this.imageUploadForm.get('FileSource').value);
            console.info(formData);return false

            this.adminApiService.uploadImage(formData, token).subscribe(
                result => {
                    if (result.type === HttpEventType.Response) {
                        this.addCategoryFrom.patchValue({
                            Image: result.body.toString()
                        });

                        this.addCategory();
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
      console.info(this.addCategoryFrom)

      if(type=='isMenu'){


      }
      else if(type=='IsActive'){

      }
        // const formArray: FormArray = this.addCategoryFrom.get('Keys') as FormArray;

        // /* Selected */
        // if(event.target.checked){
        //     // Add a new control in the arrayForm
        //     formArray.push(new FormControl(event.target.value));
        // }
        // /* unselected */
        // else{
        //     // find the unselected element
        //     let i: number = 0;

        //     formArray.controls.forEach((ctrl: FormControl) => {
        //         if(ctrl.value == event.target.value) {
        //             formArray.removeAt(i);
        //             return;
        //         }

        //         i++;
        //     });
        // }
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
