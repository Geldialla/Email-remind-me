import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent {
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    // Perform logout actions here, such as clearing session data

    // Redirect to login component
    this.router.navigate(['/Login']);
  }
}
