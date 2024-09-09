import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import User from '../type/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl="http://localhost:3000";
  httpClient=inject(HttpClient);
  constructor() {}
  getUsers(){
   return this.httpClient.get<User[]>(this.apiUrl+'/users');
  }
  getUser(id:string){
    return this.httpClient.get<User>(this.apiUrl+'/users/'+id);
   }
  addUser(model:User){
    return this.httpClient.post<User[]>(this.apiUrl+'/users',model);
  }
  updateUser(id:string,model:User){
    return this.httpClient.put<User>(this.apiUrl+'/users/'+id, model);
  }
  deleteuser(id:string){
    return this.httpClient.delete<User>(this.apiUrl+'/users/'+id);
  }
}
