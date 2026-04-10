import { HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/admin/services/admin.service';
import { Category } from 'src/app/models/category.model';
import { Package } from 'src/app/models/package.model';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { TreeNode } from '../../../../models/model';

@Component({
  selector: 'app-edit-package',
  templateUrl: './edit-package.component.html',
  styleUrls: ['./edit-package.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditPackageComponent implements OnInit {
    package : Observable<Package>;
    uploadImage: Boolean;
    categories: Category[];
    CategoryIdDefaultValue: Number;
    imageUploadForm: FormGroup;
    imageUploadInnerForm: FormGroup;
    imageUploadSliderForm:FormGroup
    imageSrc: any;
    imgs : any;
    strtDate : Date;

    editPackageForm: FormGroup;

    error: Boolean;
    errorMessage: String;
    packageId: String;
    packageData: any;
    packageType:any
  imageInnerSrc: string | ArrayBuffer;
  imageSliderImageSrc: string | ArrayBuffer;
  packages: any;
  imageSliderImageSrc1: string | ArrayBuffer;
  imageSliderImageSrc4: string | ArrayBuffer;
  imageSliderImageSrc3: string | ArrayBuffer;
  imageSliderImageSrc2: string | ArrayBuffer;
  filesToUpload: any;
  CountImageProcessed: number;

    constructor(private apiService: ApiService, private adminApiService: AdminService, private router: Router, private route: ActivatedRoute) {}
    treeControl = new NestedTreeControl<TreeNode>(node => node.children_recursive);
    dataSource = new MatTreeNestedDataSource<TreeNode>();
    selectedParent: any;
    selectedParentStatus: any;

    hasChild (_: number, node: TreeNode): boolean {
      return (node.children_recursive.length > 0) ?    true :     false;
     }
    ngOnInit(): void {

      this.selectedParentStatus=[];
      this.apiService.callApiWithBearer('','category/list').subscribe((response:any) => {
        if(response.success && response.data && response.data!=''){
          this.categories = response.data;
          this.dataSource.data=response.data;
        }else{
          this.categories = [];
          this.dataSource.data=[]
        }

      });

      this.apiService.callApiWithBearer('', 'package').subscribe((response: any) => {
        if (response.success && response.data && response.data != '') {
          this.packages = response.data;
        } else {
          this.packages = []
        }

      });
        this.packageId  = this.route.snapshot.paramMap.get('_id');
        this.initEditPackageForm();
        this.intiImageUploadForm();
        this.error = false;
        this.uploadImage = true;
    }

    intiImageUploadForm() {
        this.imageUploadForm = new FormGroup({
            Image: new FormControl('', [Validators.required]),
            FileSource: new FormControl('')
        });

        this.imageUploadInnerForm =new FormGroup({
          InnerImage: new FormControl('', [Validators.required]),
          FileSource: new FormControl('')
        });
        this.imageUploadSliderForm = new FormGroup({
          SliderImage: new FormControl('', [Validators.required]),
          SliderImage1: new FormControl('', [Validators.required]),
          SliderImage2: new FormControl('', [Validators.required]),
          SliderImage3: new FormControl('', [Validators.required]),
          SliderImage4: new FormControl('', [Validators.required]),
          FileSource: new FormControl(''),
          FileSource1: new FormControl(''),
          FileSource2: new FormControl(''),
          FileSource3: new FormControl(''),
          FileSource4: new FormControl('')
        });
    }


    initEditPackageForm() {
      this.packageData = {
        Code: '',
        Title: '',
        PackageName: '',
        PackageSlug: '',
        StartDate: '',
        CategoryId: '0',
        Price: '',
        NoOfDays: '',
        NumberOfPerson: '',
        Priority: '',
        IsActive: false,
        isMenu:false,
        Note:'',
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

        ShortDescription: '',
        Description: '',
        Type: '0',
        Image: ''
      };

      this.packageType=[{
        id:'0',
        label:'Popular'
      },
      {
        id:'1',
        label:'Domestic'
      },
      {
        id:'2',
        label:'International'
      },
      {
        id:'3',
        label:'Pilgrimage'
      },
      {
        id:'4',
        label:'Honeymoon Special'
      },
      {
        id:'5',
        label:'Special Offer'
      },
      {
        id:'6',
        label:'Top Notch '
      },
      {
        id:'7',
        label:'Other'
      },

    ]
        let token = localStorage.getItem('token');
        let requestPayload= {
          PackageId :this.packageId
}


        this.apiService.callApiWithBearer(requestPayload, 'package/details').subscribe((response:any) => {

       //   this.packageData=response.data;
          //let resSTR = JSON.parse(response.data);
          this.packageData=response.data;
          this.selectedParent=response.data.CategoryId

          this.selectedParentStatus[this.selectedParent]=true;


          this.packageData.Programs=JSON.parse(response.data.Programs)
          this.packageData.Inclusions=JSON.parse(response.data.Inclusions)
          this.packageData.Exclusions=JSON.parse(response.data.Exclusions)
          this.packageData.Terms=JSON.parse(response.data.Terms)
          this.packageData.Type=JSON.parse(response.data.Type)

          if(response.data.PakageImages==undefined ){

            this.packageData.PakageImages=[]
            this.packageData.PakageImages=[{
              new:true,
                "id": "",
                "package_id": this.packageId,
                "Image": "",
                "ImageType": "SliderImage",
                "module":"Package",
                "moduleCode":this.packageData.Code
            }]
          }else{
   let PakageImages=JSON.parse(JSON.stringify(response.data.PakageImages))
   this.packageData.PakageImages=[]
      this.packageData.PakageImages=PakageImages.filter(item=>item.ImageType=='SliderImage')
          }
          this.packageData.PakageImages.map(item=>{
            item.Image= environment.PACKAGE_FOLDER+item.Image+"?v="+Math.random();

          })

          this.packageType.map((item)=>{
            if(this.packageData.Type.findIndex((innerItem:any)=>item.id==innerItem.id)>-1){
              item.isSelected=true;
            }
          })
          console.info(this.packageData.Exclusions)

          this.packageData.Cancellation=JSON.parse(response.data.Cancellation)

          console.info(this.selectedParent)

          this.packageData.IsActive = (this.packageData.IsActive == 'Yes') ? true : false;
          this.packageData.isMenu = (this.packageData.isMenu == 'Yes') ? true : false;
          console.info(response.data.Image)


          // this.imgs = response['Images'];
            this.imageSrc = environment.PACKAGE_FOLDER+response.data.Image+"?v="+Math.random();
            this.imageInnerSrc= environment.PACKAGE_FOLDER+response.data.InnerImage+"?v="+Math.random();
            this.imageSliderImageSrc= environment.PACKAGE_FOLDER+response.data.SliderImage+"?v="+Math.random();
            // this.strtDate = new Date(response.StartDate);
            // this.editPackageForm.patchValue(response);
        });
    }
    checkboxAction(event,data){

      console.info(event.target.checked);//return false
      if(event.target.checked){
        if(this.packageData.Type.findIndex((item:any)=>item.id==data.id)<0){
          this.packageData.Type.push(data);
          console.info('checked')
        }
      }else{
        this.packageData.Type.splice(this.packageData.Type.indexOf(data.id),1)
        console.info('unchecked')
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

      }else if (type == 'Cancellation'){
        this.packageData.Cancellation.push({
          "Days": '',
          "Charges": '',
          "AppliedOn": ""
        })
      }
      else if (type == 'Terms'){
        this.packageData.Terms.push({
          "text": '',
        })
      }

      else if (type == 'PakageImages'){
        this.packageData.PakageImages.push({
           new:true,
          "id": "",
          "package_id": this.packageId,
          "Image": "",
          "ImageType": "SliderImage",
          "module":"Package",
          "moduleCode":this.packageData.Code
      })
      }

    }


    onFileSliderChange(event, index){
     this.packageData.PakageImages[index].choosedImage = event.target.files[0];
     this.packageData.PakageImages[index].newfileselected=true;
      console.log(this.packageData.PakageImages);

      const file = event.target.files[0];
const reader = new FileReader();
reader.onload = e => this.packageData.PakageImages[index].Image = reader.result;
reader.readAsDataURL(file);
    }


    remove(type,index) {
      if (type == 'program') {
        this.packageData.Programs.splice(index,1)
      }
      else if (type == 'Inclusions') {
        this.packageData.Inclusions.splice(index,1)
      }
      else if (type == 'Exclusions') {
        console.info(this.packageData.Exclusions)
        this.packageData.Exclusions.splice(index,1)

      } else if (type == 'Cancellation') {
        this.packageData.Cancellation.splice(index,1)
      }
      else if (type == 'Terms') {
        this.packageData.Terms.splice(index,1)
      }

    }
    changeParent(name, status) {
      this.selectedParentStatus=[]
      this.selectedParent = (status) ? name : 0;

      console.info( this.selectedParent)

    }
    editPackageAction() {






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
    else if (this.packageData.Code != '' && this.packages != '' && this.packages.findIndex((item: any) => item.Code == this.packageData.Code && item.PackageId!=this.packageId) > -1) {
      this.errorMessage = 'Package Code Already Exist';
      this.error = true;
      return false;;
    }

    if (this.packageData.PackageName == '') {
      this.errorMessage = 'Please Enter Package Name';
      this.error = true;
      return false;;
    }
    else if (this.packageData.PackageName != '' && this.packages != '' && this.packages.findIndex((item: any) => item.PackageName == this.packageData.PackageName && item.PackageId!=this.packageId) > -1) {
      this.errorMessage = 'Package Name Code Already Exist';
      this.error = true;
      return false;;
    }

    else if (this.packageData.PackageSlug == '') {
      this.errorMessage = 'Please Enter Package Slug';
      this.error = true;
      return false;;
    }
    else if (this.packageData.PackageSlug != '' && this.packages != '' && this.packages.findIndex((item: any) => item.Code == this.packageData.PackageSlug && item.PackageId!=this.packageId) > -1) {
      this.errorMessage = 'Package Code Already Exist';
      this.error = true;
      return false;;
    }

    else if (this.packageData.Title == '') {
      this.errorMessage = 'Please Enter Package Title';
      this.error = true;
      return false;;
    }
    else if (this.packageData.Title != '' && this.packages != '' && this.packages.findIndex((item: any) => item.Title == this.packageData.Title && item.PackageId!=this.packageId) > -1) {
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
      this.updatePackage();return false;

    }



    uploadOneAtTime(files, fileNo) {
      files.totalImage = this.filesToUpload.length;
      files.fileNo = fileNo;


      // "id": "",
      // "package_id": this.packageId,
      // "Image": "",
      // "ImageType": "SliderImage",
      // "module":"Package",
      // "moduleCode":this.packageData.Code

      var formData = new FormData();
      formData.append('ImageId', files.id);
      formData.append('Image', files.choosedImage);
      formData.append('ImageType','SliderImage');

      formData.append('module', 'Package');
      formData.append('moduleId', files.package_id);
      formData.append('moduleCode',files.moduleCode);
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
    updatePackage() {
    //  console.info(this.packageData.PakageImages.filter(item=>item.new))


     // return false;
      this.packageData.CategoryId= this.selectedParent

    let data = JSON.parse(JSON.stringify(this.packageData));
    data.IsActive = (data.IsActive == true) ? 'Yes' : 'No';
    data.isMenu = (data.isMenu == true) ? 'Yes' : 'No';


    delete data.image;
    delete data.Image;
    delete data.InnerImage;
    delete data.SliderImage;
        this.apiService.callApiWithBearer(data,'package/update').subscribe(
            (result:any) => {
                if(result.success){
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Package Updated!',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    //console.info(this.imageUploadForm.get('FileSource').value)
                    if (this.uploadImage ) {

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
        formData.append('Image', this.imageUploadForm.get('FileSource').value||'');
        formData.append('InnerImage', this.imageUploadInnerForm.get('FileSource').value||'');
        formData.append('SliderImage', this.imageUploadSliderForm.get('FileSource').value||'');
        this.apiService.callApiWithBearer(formData, 'package/upload').subscribe(
          (result:any) => {
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
      // } else {
      //   this.imageUploadForm.markAsTouched();
      //   this.error = true;
      //   this.errorMessage = 'Image not selected! Please select the image.';
      // }
    }

    uploadSliderImage(){

      var formData = new FormData();
      formData.append('PackageId', this.packageData.PackageId);
      formData.append('Code', this.packageData.Code);
      formData.append('Image', this.imageUploadForm.get('FileSource').value||'');
      formData.append('InnerImage', this.imageUploadInnerForm.get('FileSource').value||'');
      formData.append('SliderImage', this.imageUploadSliderForm.get('FileSource').value||'');
      this.apiService.callApiWithBearer(formData, 'package/upload').subscribe(
        (result:any) => {
          if (result.success) {


            // setTimeout(() => {
            //   this.router.navigate(['/admin/packages']);
            // }, 1800);



          }



        },
        error => {
          this.error = true;
          this.errorMessage = error.error;
        }
      );

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
        } else if(type=='InnerImage') {

          this.imageUploadInnerForm.patchValue({
            FileSource: file
          });
          this.packageData.InnerImage = file;

          reader.onload = e => this.imageInnerSrc = reader.result;
          reader.readAsDataURL(file);
        }

        else if(type=='SliderImage') {

          this.imageUploadSliderForm.patchValue({
            FileSource: file
          });
          this.packageData.SliderImage = file;

          reader.onload = e => this.imageSliderImageSrc = reader.result;
          reader.readAsDataURL(file);
        }


        else if(type=='SliderImage1') {

          this.imageUploadSliderForm.patchValue({
            FileSource1: file
          });
          this.packageData.SliderImage = file;

          reader.onload = e => this.imageSliderImageSrc1 = reader.result;
          reader.readAsDataURL(file);
        }

        else if(type=='SliderImage2') {

          this.imageUploadSliderForm.patchValue({
            FileSource2: file
          });
          this.packageData.SliderImage = file;

          reader.onload = e => this.imageSliderImageSrc2 = reader.result;
          reader.readAsDataURL(file);
        }

        else if(type=='SliderImage3') {

          this.imageUploadSliderForm.patchValue({
            FileSource3: file
          });
          this.packageData.SliderImage = file;

          reader.onload = e => this.imageSliderImageSrc3 = reader.result;
          reader.readAsDataURL(file);
        }

        else if(type=='SliderImage4') {

          this.imageUploadSliderForm.patchValue({
            FileSource4: file
          });
          this.packageData.SliderImage = file;

          reader.onload = e => this.imageSliderImageSrc4 = reader.result;
          reader.readAsDataURL(file);
        }






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
    goToPackage(){
      console.info(window.location.hostname);//return false;
      this.router.navigate(['package/'+this.packageData['PackageSlug']])
      .then(() => {
       // window.open(window.location.href+'/'+this.packageData['PackageSlug'], '_blank');
        window.location.reload();
      });

    }
}
