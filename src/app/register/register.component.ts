import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from "../api-service.service";
import {AuthService} from "../auth.service";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private apiService:ApiServiceService,private auth:AuthService, private toastr:ToastrService,private router:Router) { }

  ngOnInit(): void {

  }
  image?:any;
  errors:any = [];

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

      this.apiService.register(form).subscribe(
        data=>{
          this.toastr.success("Успешно зарегестрировано");
          this.router.navigateByUrl("/login");
        },
        error => {if(error.status == 422){
          this.toastr.error("Упс, проверьте правильность поля");
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
