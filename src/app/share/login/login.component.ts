import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/entity/user';
import { GeldiHttpClient } from 'src/app/services/data-layer/geldi-be-mock.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  loggedInUser: User | null = null;

  constructor(
    private router: Router,
    private userService: GeldiHttpClient<User>,
  ) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  login() {
  
    if (this.email === 'AddYourUserName' && this.password === 'AddYourPassword') {
      console.log('Admin login successful');
      this.router.navigate(['/Admin/Table-List']);
    } else {
      this.userService.getAll('User').subscribe(
        (users) => {
          const user = users.find((u) => u.email === this.email && u.password === this.password);
  
          if (user) {
            console.log('User login successful');
            this.loggedInUser = user;
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            this.router.navigate(['/User/Product']);
          } else {
            console.log('Login failed');
            this.errorMessage = 'Invalid email or password. Please try again.';
          }
        },
        (error) => {
          console.error('Error occurred while logging in:', error);
          this.errorMessage = 'An error occurred. Please try again later.';
        }
      );
    }
  }
  
  


  

  togglePasswordVisibility() {
    const passwordInput = document.getElementById('form2Example27') as HTMLInputElement;

    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  }
}
