import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authSvc: AuthService,private router: Router) { }

  ngOnInit() {
  }

  async onLoginMicrosoft(){
    try{
      const user = await this.authSvc.loginMicrosoft();
      if(user){
        console.log('User-->',user);
      }
    }catch(error){
      console.log('Error-->',error);
    }
  }

  async onLoginGoogle(){
    try{
      const user = await this.authSvc.loginGoogle();
      if(user){
        this.redirectUser(user.emailVerified);
        console.log('User-->',user);
      }
    }catch(error){
      console.log('Error-->',error);
    }
  }

  redirectUser(isVerified: boolean){
    if(isVerified){
      this.router.navigate(['tokens']);
    }
  }
}
