import { HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/admin/services/admin.service';
import { Category } from 'src/app/models/category.model';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
declare var $: any;

import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { TreeNode } from '../../../../models/model';

@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styles: [`
  @import '@angular/material/prebuilt-themes/indigo-pink.css';
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
export class AddPackageComponent implements OnInit {
  uploadImage: Boolean;
  categories: Category[];
  CategoryIdDefaultValue: Number;
  imageUploadForm: FormGroup;
  imageUploadInnerForm: FormGroup
  imageUploadSliderForm: FormGroup
  imageSrc: any;

  addPackageForm: FormGroup;

  error: Boolean;
  errorMessage: String;
  packageData: any;
  packageType: any
  imageInnerSrc: string | ArrayBuffer;
  imageSliderImageSrc: string | ArrayBuffer;
  packages: any;
  filesToUpload: any;
  CountImageProcessed: number;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private adminApiService: AdminService, private router: Router) { }
  treeControl = new NestedTreeControl<TreeNode>(node => node.children_recursive);
  dataSource = new MatTreeNestedDataSource<TreeNode>();
  selectedParent: any;
  selectedParentStatus: any;

  hasChild(_: number, node: TreeNode): boolean {
    return (node.children_recursive.length > 0) ? true : false;
  }

  ngOnInit(): void {
    // this.initAddPackageForm();
    this.selectedParentStatus = []
    this.intiImageUploadForm();
    this.error = false;
    this.uploadImage = true;

    const today = new Date();
    const yyyy = today.getFullYear();
    let mm, dd;
    mm = today.getMonth() + 1; // Months start at 0!
    dd = today.getDate();

    if (dd < 10) { dd = '0' + dd; }
    if (mm < 10) { mm = '0' + mm; }

    const formattedToday = yyyy + '-' + mm + '-' + dd;


    this.packageData = {
      Code: '',
      Title: '',
      PackageName: '',
      PackageSlug: '',
      StartDate: formattedToday,
      CategoryId: 0,
      Price: 0,
      NoOfDays: 0,
      NumberOfPerson: 0,
      Priority: '',
      IsActive: false,
      isMenu: false,
      Note: '',
      Programs: [
        {
          "Day": 1,
          "Title": '',
          "Description": ''
        }
      ],
      Inclusions: [
        {
          "text": '',
        }
      ],
      Exclusions: [
        {
          "text": '',
        }
      ],

      Terms: [
        {
          "text": '',
        }
      ],
      Cancellation: [{
        "Days": '',
        "Charges": '',
        "AppliedOn": ""
      }],
      PakageImages:[{
        new:true,
       "id": "",
       "package_id":'',
       "Image": "",
       "ImageType": "SliderImage",
       "module":"Package",
       "moduleCode":''
   }],

      ShortDescription: '',
      Description: '',
      Type: [],
      Image: ''
    };

    this.apiService.callApiWithBearer('', 'category/list').subscribe((response: any) => {
      if (response.success && response.data && response.data != '') {
        this.categories = response.data;
        this.dataSource.data = response.data

        let slug = this.route.snapshot.paramMap.get('_id');

        let categoryId;
        if (this.route.snapshot.paramMap.get('_id') && this.categories.findIndex((item: any) => item.CategoryId == slug) > -1) {
          categoryId = Number(slug)


        } else {
          categoryId = 0
        }
        console.info(categoryId)
        this.selectedParent = categoryId
        this.packageData.CategoryId = categoryId
        this.initAddPackageForm(categoryId);
      } else {
        this.categories = [];
        this.dataSource.data = []
      }

    });

    this.apiService.callApiWithBearer('', 'package').subscribe((response: any) => {
      if (response.success && response.data && response.data != '') {
        this.packages = response.data;
      } else {
        this.packages = []
      }

    });
  }



  intiImageUploadForm() {
    this.imageUploadForm = new FormGroup({
      Image: new FormControl('', [Validators.required]),
      FileSource: new FormControl('')
    });


    this.imageUploadInnerForm = new FormGroup({
      InnerImage: new FormControl('', [Validators.required]),
      FileSource: new FormControl('')
    });

    this.imageUploadSliderForm = new FormGroup({
      SliderImage: new FormControl('', [Validators.required]),
      FileSource: new FormControl('')
    });
  }

  initAddPackageForm(categoryId) {
    this.addPackageForm = new FormGroup({
      Code: new FormControl('', [Validators.required, Validators.minLength(6)]),
      Title: new FormControl('', [Validators.required, Validators.minLength(6)]),
      PackageSlug: new FormControl('', [Validators.required, Validators.minLength(6)]),
      StartDate: new FormControl('', [Validators.required]),
      CategoryId: new FormControl('', [Validators.required, Validators.pattern(/[1-9]/)]),
      Price: new FormControl('', [Validators.required]),
      NoOfDays: new FormControl('', [Validators.required]),
      Inclusions: new FormControl('', [Validators.required, Validators.minLength(2)]),
      Exclusions: new FormControl('', [Validators.required, Validators.minLength(2)]),
      Extensions: new FormControl('', [Validators.required, Validators.minLength(2)]),
      Executed: new FormControl('', [Validators.required, Validators.minLength(2)]),
      Description: new FormControl('', [Validators.required]),
      Type: new FormControl('', [Validators.required, Validators.pattern(/[1-9]/)]),
      Image: new FormControl('')
    });




    this.packageType = [{
      id: '0',
      label: 'Popular'
    },
    {
      id: '1',
      label: 'Domestic'
    },
    {
      id: '2',
      label: 'International'
    },
    {
      id: '3',
      label: 'Pilgrimage'
    },
    {
      id: '4',
      label: 'Honeymoon Special'
    },
    {
      id: '5',
      label: 'Special Offer'
    },
    {
      id: '6',
      label: 'Top Notch '
    },
    {
      id: '7',
      label: 'Other'
    },

    ]

  }
  checkboxAction(event, data) {
    if (event.target.checked) {
      if (this.packageData.Type.findIndex((item: any) => item.id == data.id) < 0) {
        this.packageData.Type.push(data);
      }
    } else {
      this.packageData.Type.splice(this.packageData.Type.indexOf(data.id), 1)
    }
    console.info(this.packageData.Type)
  }
  addMore(type) {
    if (type == 'program') {
      this.packageData.Programs.push({
        "Day": this.packageData.Programs.length + 1,
        "Title": '',
        "Description": ''
      })
    }
    else if (type == 'Inclusions') {
      this.packageData.Inclusions.push({
        "text": '',
      })

    }
    else if (type == 'Exclusions') {
      this.packageData.Exclusions.push({
        "text": '',
      })

    } else if (type == 'Cancellation') {
      this.packageData.Cancellation.push({
        "Days": '',
        "Charges": '',
        "AppliedOn": ""
      })
    }
    else if (type == 'Terms') {
      this.packageData.Terms.push({
        "text": '',
      })
    }
    else if (type == 'PakageImages'){
      this.packageData.PakageImages.push({
         new:true,
        "id": "",
        "package_id": '',
        "Image": "",
        "ImageType": "SliderImage",
        "module":"Package",
        "moduleCode":''
    })
    }

  }
  onFileSliderChange(event, index){
    this.packageData.PakageImages[index].choosedImage = event.target.files[0];
    this.packageData.PakageImages[index].newfileselected=true;
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => this.packageData.PakageImages[index].Image = reader.result;
    reader.readAsDataURL(file);
   }
  remove(type, index) {
    if (type == 'program') {
      this.packageData.Programs.splice(index, 1)
    }
    else if (type == 'Inclusions') {
      this.packageData.Inclusions.splice(index, 1)
    }
    else if (type == 'Exclusions') {
      this.packageData.Exclusions.splice(index, 1)

    } else if (type == 'Cancellation') {
      this.packageData.Cancellation.splice(index, 1)
    }
    else if (type == 'Terms') {
      this.packageData.Terms.splice(index, 1)
    }

  }


  changeParent(name, status) {
    this.selectedParentStatus = []
    this.selectedParent = (status) ? name : 0;

    console.info(this.selectedParent)

  }
  addPackageAction() {



    const NoOfDays = Number(this.packageData.NoOfDays);
    const NumberOfPerson = Number(this.packageData.NumberOfPerson);
    const price = Number(this.packageData.Price);

    console.info(Number.isInteger(NumberOfPerson), Number(NumberOfPerson) < 0, NumberOfPerson)


    if (this.packageData.Code == '') {
      this.error = true;
      this.errorMessage = 'Please Enter Package Code';
      console.info('here')
      return false;
    }
    else if (this.packageData.Code != '' && this.packages != '' && this.packages.findIndex((item: any) => item.Code == this.packageData.Code) > -1) {
      this.errorMessage = 'Package Code Already Exist';
      this.error = true;
      return false;;
    }

    if (this.packageData.PackageName == '') {
      this.errorMessage = 'Please Enter Package Name';
      this.error = true;
      return false;;
    }
    else if (this.packageData.PackageName != '' && this.packages != '' && this.packages.findIndex((item: any) => item.PackageName == this.packageData.PackageName) > -1) {
      this.errorMessage = 'Package Name Code Already Exist';
      this.error = true;
      return false;;
    }

    else if (this.packageData.PackageSlug == '') {
      this.errorMessage = 'Please Enter Package Slug';
      this.error = true;
      return false;;
    }
    else if (this.packageData.PackageSlug != '' && this.packages != '' && this.packages.findIndex((item: any) => item.Code == this.packageData.PackageSlug) > -1) {
      this.errorMessage = 'Package Code Already Exist';
      this.error = true;
      return false;;
    }

    else if (this.packageData.Title == '') {
      this.errorMessage = 'Please Enter Package Title';
      this.error = true;
      return false;;
    }
    else if (this.packageData.Title != '' && this.packages != '' && this.packages.findIndex((item: any) => item.Title == this.packageData.Title) > -1) {
      this.errorMessage = 'Package Title Already Exist';
      this.error = true;
      return false;;
    }



    else if (this.packageData.Type == '') {
      this.errorMessage = 'Package Select Package Type';
      this.error = true;
      return false;;
    }


    else if (this.packageData.ShortDescription == '') {
      this.errorMessage = 'Please Enter Short Description ';
      this.error = true;
      return false;
    }

    else if (this.packageData.Description == '') {
      this.errorMessage = 'Please Enter Long Description ';
      this.error = true;
      return false;
    }

    else if (Number.isInteger(NumberOfPerson) && Number(NumberOfPerson) < 0 || isNaN(NumberOfPerson)) {

      this.errorMessage = 'Please Enter Valid No. Of Person ';
      this.error = true;
      return false;
    }

    else if (Number.isInteger(price) && Number(price) < 0 || isNaN(NumberOfPerson)) {

      this.errorMessage = 'Please Enter Valid Price ';
      this.error = true;
      return false;
    }

    else if (Number.isInteger(NoOfDays) && Number(NoOfDays) < 0 || isNaN(NumberOfPerson)) {
      this.errorMessage = 'Please Enter Valid No. Of Days ';
      this.error = true;
      return false;
    }
    this.addPackage(); return false;

  }



  addPackage() {




    // this.selectedParent
    this.packageData.CategoryId = this.selectedParent

    let data = JSON.parse(JSON.stringify(this.packageData));
    data.IsActive = (data.IsActive == true) ? 'Yes' : 'No';
    data.isMenu = (data.isMenu == true) ? 'Yes' : 'No';

    delete data.image;
    delete data.Image;
    delete data.InnerImage;
    delete data.SliderImage;



    // data.Note='Hotels are subject to change due to availability reasons, and may be substituted with others of similar category and star rating.'




    this.apiService.callApiWithBearer(data, 'package/add'
    ).subscribe(
      (result: any) => {
        //console.log(result);
        if (result.success) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Package Created!',
            showConfirmButton: false,
            timer: 1500
          });

          if (this.uploadImage) {
            this.packageData.PackageId = result.data.PackageId;
            console.info(result.data);//return false
            this.imageUpload()
          }

        }
        this.error = false;
      },
      error => {
        this.error = true;
        this.errorMessage = error.error;
      }
    );
  }

  resetError() {
    this.error = false;
    this.errorMessage = '';
  }

  imageUpload() {
    // Get Stored token
    let token = localStorage.getItem('token');

    // if (this.imageUploadForm.valid) {
    var formData = new FormData();
    formData.append('PackageId', this.packageData.PackageId);
    formData.append('Code', this.packageData.Code);
    formData.append('Image', this.imageUploadForm.get('FileSource').value);
    formData.append('InnerImage', this.imageUploadInnerForm.get('FileSource').value);
    formData.append('SliderImage', this.imageUploadSliderForm.get('FileSource').value);

    this.apiService.callApiWithBearer(formData, 'package/upload').subscribe(
      (result: any) => {
        if (result.success) {


          this.filesToUpload=this.packageData.PakageImages.filter(item=>item.newfileselected)
          if(this.filesToUpload.length>0){
            this.uploadOneAtTime(this.filesToUpload[0], 1);
            this.CountImageProcessed = 1;

          }else{
            setTimeout(() => {
              this.router.navigate(['/admin/packages']);
            }, 1800);
          }


        }



      },
      error => {
        this.error = true;
        this.errorMessage = error.error;
      }
    );
      }

  uploadOneAtTime(files, fileNo) {
    files.totalImage = this.filesToUpload.length;
    files.fileNo = fileNo;


    var formData = new FormData();
    formData.append('ImageId', files.id);
    formData.append('Image', files.choosedImage);
    formData.append('ImageType','SliderImage');

    formData.append('module', 'Package');
    formData.append('moduleId', this.packageData.PackageId);
    formData.append('moduleCode',this.packageData.Code);
    this.apiService.callApiWithBearer(formData, 'imageupload/store').subscribe((response:any) => {
      if (response.success) {
        if (fileNo == files.totalImage) {
          setTimeout(() => {
            this.router.navigate(['/admin/packages']);
          }, 1800);

        }
        if (fileNo < files.totalImage) {
          fileNo++;
          const currentFile = fileNo - 1;
          this.CountImageProcessed = fileNo;
          this.uploadOneAtTime(this.filesToUpload[currentFile], fileNo);
        }
        this.CountImageProcessed = fileNo;
      }
      else {

      }


    });
  }

  onFileChange(event, type) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      if (type == 'homeBanner') {
        this.imageUploadForm.patchValue({
          FileSource: file
        });
        this.packageData.image = file;
        reader.onload = e => this.imageSrc = reader.result;
        reader.readAsDataURL(file);
      } else if (type == 'InnerImage') {

        this.imageUploadInnerForm.patchValue({
          FileSource: file
        });
        this.packageData.InnerImage = file;

        reader.onload = e => this.imageInnerSrc = reader.result;
        reader.readAsDataURL(file);
      }

      else if (type == 'SliderImage') {

        this.imageUploadSliderForm.patchValue({
          FileSource: file
        });
        this.packageData.SliderImage = file;

        reader.onload = e => this.imageSliderImageSrc = reader.result;
        reader.readAsDataURL(file);
      }






    }
  }

  enableDisableImageUploadAction() {
    if ($('#enableUpload').prop('checked')) {
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
