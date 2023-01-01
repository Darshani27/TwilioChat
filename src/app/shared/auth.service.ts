import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 

  constructor(private http:HttpClient) { }
  authenticate(username: string)  {
    return this.http.get('http://localhost:3000',{responseType: 'text'}).pipe(map((res:any)=>{
      console.log(res);
      return res;
    }));
    }
    refreshToken() {
      const username=localStorage.getItem('twackUsername') as any;
      this.authenticate(username).subscribe( (auth: any) => {
        localStorage.setItem('twackToken', auth);
      });
    }
}
