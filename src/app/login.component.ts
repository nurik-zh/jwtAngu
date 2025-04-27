import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { iif } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class LoginComponent {

  email: string = ''
  password: string = ''
  error: string = ''

  constructor(private authService: AuthService, private router: Router){

  }

  onLogin(){
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        if(res){
          this.authService.saveToken(res.token)
          this.router.navigate(['/users'])
        }
      }
    })
  }


  // constructor(private authService: AuthService, private router: Router) {}
  // onLogin() {
  //   console.log('Login start:', this.email, this.password);
  //   debugger;
  //   this.authService.login(this.email, this.password).subscribe({
  //     next: (res) => {
  //       console.log('Login response:', res);
  //       this.authService.saveToken(res.token);
  //       this.router.navigate(['/users']);
  //     }
  //   });
  // }
  
  
}
