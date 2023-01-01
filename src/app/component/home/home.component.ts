import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public username!: string;
  token:string='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2RmZTNmYmY4YmVjY2ZjNTVlZmE0MDUzMWUzZDQ4NDIyLTE2NzI0OTMxNjciLCJncmFudHMiOnsiaWRlbnRpdHkiOiJ1c2VyQGV4YW1wbGUuY29tIiwiY2hhdCI6eyJzZXJ2aWNlX3NpZCI6IklTM2Y2NzRjOWJjNTdlNDhiOTgzOWJlYWFkYzYxZTQ3YjcifX0sImlhdCI6MTY3MjQ5MzE2NywiZXhwIjoxNjcyNDk2NzY3LCJpc3MiOiJTS2RmZTNmYmY4YmVjY2ZjNTVlZmE0MDUzMWUzZDQ4NDIyIiwic3ViIjoiQUNkZjA1MGIyNzhiNmE4NzAzOWU5ZmRjNmM4MWNhZDY1OSJ9.k04DnJ_C4EQ2ALRxXii9yckRkWU1lQKGqAwk5IfYeAw';
  
  // token: string='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2RmZTNmYmY4YmVjY2ZjNTVlZmE0MDUzMWUzZDQ4NDIyLTE2NzI0NjUwMjgiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJ1c2VyQGV4YW1wbGUuY29tIiwiY2hhdCI6eyJzZXJ2aWNlX3NpZCI6IklTM2Y2NzRjOWJjNTdlNDhiOTgzOWJlYWFkYzYxZTQ3YjcifX0sImlhdCI6MTY3MjQ2NTAyOCwiZXhwIjoxNjcyNDY4NjI4LCJpc3MiOiJTS2RmZTNmYmY4YmVjY2ZjNTVlZmE0MDUzMWUzZDQ4NDIyIiwic3ViIjoiQUNkZjA1MGIyNzhiNmE4NzAzOWU5ZmRjNmM4MWNhZDY1OSJ9.w1-anDJ-0aLmYRc7YjAtRyP_32svzMtid3WFz20w49w';
  constructor(private router:Router,private authService:AuthService) { }

  ngOnInit(): void {
    if(localStorage.getItem('twackToken'))
    {
      this.router.navigate(['/chat']);
    }
  }

  submitLogin()
  {
    localStorage.setItem('twackUsername',this.username);
    // this.authService.authenticate(this.username).subscribe((res:any)=>{
    //   localStorage.setItem('twackToken',res);
    //   this.router.navigate(['chat']);

    // })
    localStorage.setItem('twackToken',this.token);
    this.router.navigate(['chat']);
  }

}
