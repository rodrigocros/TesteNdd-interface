import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../app/Interfaces/user';
import { IUserUpdate } from '../app/Interfaces/userUpdate';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiUrl = 'http://localhost:5182';
  http=inject(HttpClient);

  constructor() { }

  getallUsers() : Observable<IUser[]>
  {
    return this.http.get<IUser[ ]>(this.apiUrl+'/api/User');
  }
  createUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.apiUrl+'/api/User', user);
  }
  getUserById(id: string): Observable<IUser> {
    return this.http.get<IUser>(this.apiUrl+'/api/User/'+id);
  }
  updateUser(id: string, userupdate : IUserUpdate): Observable<IUserUpdate> {
    return this.http.put<IUserUpdate>(this.apiUrl+'/api/User/'+id, userupdate);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(this.apiUrl+'/api/User/'+id);
  }
}
