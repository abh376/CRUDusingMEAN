import { Component, inject, OnInit } from '@angular/core';
import User from '../type/user';
import { UserService } from '../services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatButtonModule,RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{
  users:User[]=[];
  userService=inject(UserService);
  ngOnInit(): void {
    this.userService.getUsers().subscribe(result=>{
      this.users=result;
      console.log(this.users);
    })
  }
  delete(id:string){
    const ok=confirm("Are you sure to delete user");
    if(ok)
    {this.userService.deleteuser(id).subscribe((result)=>{
      alert("User Deleted successfully");
      this.users=this.users.filter((u)=>u._id!=id);
    });}
  }
}
