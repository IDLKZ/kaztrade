import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from "../api-service.service";
import {AuthService} from "../auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  user?:any;
  image?:any;
  errors:any = [];



  constructor(private apiService:ApiServiceService,private auth:AuthService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.auth.profileUser().subscribe(
      data=>{this.user = data; this.postbox.get("name")?.setValue(data.name);
        this.postbox.get("email")?.setValue(data.email);
        this.postbox.get("phone")?.setValue(data.phone);
        this.postbox.get("description")?.setValue(data.description);
      },
      error => {console.log(error)}
    )

  }
  postbox: FormGroup = new FormGroup({
    name:new FormControl("",Validators.required),
    email:new FormControl("",[Validators.required,Validators.email]),
    phone:new FormControl("",Validators.required),
    password:new FormControl("",[Validators.required,Validators.minLength(6)]),
    description:new FormControl(""),
  });

  uploadFile(value:any){
    let allImages: Array<string> = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/tiff', 'image/bpg'];
    if(allImages.includes(value.target.files[0].type)){
      this.image = value.target.files[0];
    }
    else{
      this.image = null;
      this.toastr.warning("Поле принимает только изображения")
    }
  }

  updateProfile(){
    this.errors = [];
    if(this.postbox.valid){
       const form = new FormData();
       form.append("name",this.postbox.get("name")?.value);
       form.append("email",this.postbox.get("email")?.value);
       form.append("phone",this.postbox.get("phone")?.value);
       form.append("password",this.postbox.get("password")?.value);
       form.append("description",this.postbox.get("description")?.value);
       if(this.image){form.append("image",this.image,this.image.name)}

       this.apiService.chageProfile(form).subscribe(
         data=>{location.reload()},
         error => {if(error.status == 422){
           let errorObj = error.error.errors;
           for (let index in errorObj){
             for (let item of errorObj[index]){
               this.errors?.push(item);
             }
           }
         }}
       )
    }
    else{
      this.toastr.warning("Заполните все поля!")
    }
  }

}
