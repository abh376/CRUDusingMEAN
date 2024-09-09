import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import User from '../../type/user';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [MatInputModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit{
  formBuilder=inject(FormBuilder);
  userform:FormGroup=this.formBuilder.group({
    name:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    age:[''],
    address:[''],
    password:['',[Validators.required,Validators.minLength(8)]]
  });
  route=inject(ActivatedRoute);
  editUserId!:string;
  ngOnInit(): void {
    this.editUserId=this.route.snapshot.params['id'];
    console.log(this.editUserId);
   if(this.editUserId)
   {
    this.userService.getUser(this.editUserId).subscribe((result)=>{
      this.userform.patchValue(result);
    })
   }
  }
  userService=inject(UserService);
  router=inject(Router);
  updateUser(){
    if(this.userform.invalid)
      {
        alert("please provide all valid values");
        return;}
        const model:User=this.userform.value;
        this.userService.updateUser(this.editUserId,model).subscribe(result=>{
          alert("user updated successfully");
          this.router.navigateByUrl('/');
    });    
  }
  addUser()
{
  if(this.userform.invalid)
  {
    alert("please provide all valid values");
    return;}
    const model:User=this.userform.value;
    this.userService.addUser(model).subscribe(result=>{
      alert("user Added successfully");
      this.router.navigateByUrl('/');
});}}
