import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';  

import { AdminService } from 'src/app/admin/services/admin.service';
import { States } from 'src/app/models/states.model';

@Component({
  selector: 'app-add-destination',
  templateUrl: './add-destination.component.html',
  styles: [
  ]
})
export class AddDestinationComponent implements OnInit {
  states: States[];

  uploadImage: Boolean;
  imageUploadForm: FormGroup;
  imageSrc: any;

  addDestinationForm: FormGroup;
  keysOptions: Array<any> =[];
  sightseeingOptions: Array<any> =[];

  error:Boolean;
  errorMessage:String;

  constructor(private adminApiService: AdminService, private router: Router) {}

  ngOnInit(): void {
      this.initAddDestinationForm();
      this.intiImageUploadForm();
      this.error = false;

      this.adminApiService.getAllStates().subscribe(response => {
        this.states = response;
    });
  }

  intiImageUploadForm() {
      this.imageUploadForm = new FormGroup({
          Image: new FormControl('', [Validators.required]),
          FileSource: new FormControl('')
      });
  }

  initAddDestinationForm(){
      this.addDestinationForm = new FormGroup({
        DestinationName:    new FormControl('', [Validators.required, Validators.minLength(6)]),
        DestinationSlug:    new FormControl('', [Validators.required, Validators.minLength(6)]),
        StateId:            new FormControl('', [Validators.required]),
        Keys:               new FormArray([]),
        Sightseeing:        new FormControl([]),
        Image:              new FormControl(''),
        Hotel:              new FormControl('')
      });
  }

  addDestinationAction(){
    if (this.addDestinationForm.valid) {
        if(this.uploadImage) {
            this.imageUpload()
        }
        else {
            this.addDestinationForm.patchValue({
                Image: $('#ImageUrl').val().toString()
            });

            this.addDestination();
        }
    } else {
        this.addDestinationForm.markAsTouched();
        this.error = true;
        this.errorMessage = 'Form Validation Error';
    }
  }

  addDestination(){
      // Get Stored token
      let token = localStorage.getItem('token');

      this.adminApiService.addDestination(this.addDestinationForm.value, token).subscribe(
          result => {
              //console.log(result);
              if(result.success){
                  Swal.fire({
                      position: 'top-end',  
                      icon: 'success',  
                      title: 'Destination Created!',  
                      showConfirmButton: false,
                  }); 
                  setTimeout(() => {
                      this.router.navigate(['/admin/destinations']);
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
                      this.addDestinationForm.patchValue({
                          Image: result.body.toString()
                      });

                      this.addDestination();
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

  keySelectAction(event, key){
      const formArray: FormArray = this.addDestinationForm.get(key) as FormArray;

      /* Selected */
      if(event.target.checked){
          // Add a new control in the arrayForm
          formArray.push(new FormControl(event.target.value));
      }
      /* unselected */
      else{
          // find the unselected element
          let i: number = 0;

          formArray.controls.forEach((ctrl: FormControl) => {
              if(ctrl.value == event.target.value) {
                  formArray.removeAt(i);
                  return;
              }

              i++;
          });
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