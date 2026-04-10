import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from 'src/app/services/api.service';
import { AdminService } from 'src/app/admin/services/admin.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manage-addpackagetype',
  templateUrl: './manage-addpackagetype.component.html',
  styleUrls: ['./manage-addpackagetype.component.scss']
})
export class ManageAddpackagetypeComponent implements OnInit {

  uploadImage=true;
  PackageGroup: any = [];
  CountImageProcessed: any;

  constructor(private adminApiService: AdminService, private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getPackageGroup();

   // this.addMore()
  }
  getPackageGroup(){

    this.apiService.callApiWithBearer('', 'packagegroup').subscribe((response:any) => {
      if (response.success) {
        if(response.data!=''){
          response.data.map(item=>{
            this.PackageGroup.push({
              moduleCode: item.title,
              ImageType: item.subtitle,
              moduleId: item.Slug,
              id: item.id,
              module:'Packagegroup',
              Image:environment.PACKAGE_GROUP_FOLDER+item.Image+"?v="+Math.random()
            })
          })

        }else{
          this.addMore()
        }
       console.info(response)
      }
      else {

      }


    });

  }
  addMore() {
    this.PackageGroup.push({
      moduleCode: '',
      ImageType: '',
      moduleId: '',
      module:'Packagegroup'
    })
  }
  onFileSliderChange(event, index) {
    this.PackageGroup[index].choosedImage = event.target.files[0];
    this.PackageGroup[index].newfileselected = true;


    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => this.PackageGroup[index].Image = reader.result;
    reader.readAsDataURL(file);
  }
  addPackageGroupAction(){
    this.uploadOneAtTime(this.PackageGroup[0], 1);
    this.CountImageProcessed = 1;
  }
  uploadOneAtTime(files, fileNo) {
    files.totalImage = this.PackageGroup.length;
    files.fileNo = fileNo;


    // "id": "",
    // "package_id": this.packageId,
    // "Image": "",
    // "ImageType": "SliderImage",
    // "module":"Package",
    // "moduleCode":this.packageData.Code

    var formData = new FormData();



if(files.id){
  formData.append('ImageId', files.id);
}
if(files.choosedImage){
  formData.append('Image', files.choosedImage);
}

    formData.append('ImageType',files.ImageType);

    formData.append('module', 'Packagegroup');
    formData.append('moduleId', files.moduleId);
    formData.append('moduleCode',files.moduleCode);
    this.apiService.callApiWithBearer(formData, 'imageupload/store').subscribe((response:any) => {
      if (response.success) {
        if (fileNo == files.totalImage) {
          setTimeout(() => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Package group Updated!',
              showConfirmButton: false,
              timer: 1500
          });
          }, 1800);

        }
        if (fileNo < files.totalImage) {
          fileNo++;
          const currentFile = fileNo - 1;
          this.CountImageProcessed = fileNo;
          this.uploadOneAtTime(this.PackageGroup[currentFile], fileNo);
        }
        this.CountImageProcessed = fileNo;
      }
      else {

      }


    });
  }





}
