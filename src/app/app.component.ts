import { Component } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { Table } from 'src/app/entity/table';
import { GeldiHttpClient } from './services/data-layer/geldi-be-mock.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private dbService: GeldiHttpClient<Table>) {
    // Call sendEmail() initially
    this.sendEmail();
    
    // Check every 12 hours
    setInterval(() => {
      this.sendEmail();
    }, 12 * 60 * 60 * 1000); // 12 hours * 60 minutes * 60 seconds * 1000 milliseconds
  }
  
  ngOnInit(): void {
    this.getData();
  }
  
  getData() {
    this.dbService.getAll('Tablee').subscribe((res) => {
      this.table = res;
    });
  }
  
  table: Table[] = [];

  sendEmail() {
    const currentDate = new Date();
    let approachingUsers: string[] = [];
  
    this.table.forEach((tableItem) => {
      const endDate = new Date(tableItem.DataMbarimit);
      const timeDifference = endDate.getTime() - currentDate.getTime();
      const hoursDifference = timeDifference / (1000 * 3600);
  
      if (hoursDifference <= 48 && hoursDifference > 0) {
        approachingUsers.push(tableItem.Punojesi);
      }
    });
  
    if (approachingUsers.length > 0) {
      let message = `The end date for the following members is approaching:\n`;
      if (approachingUsers.length === 1) {
        message += `Name: ${approachingUsers[0]}`;
      } else {
        approachingUsers.forEach((user, index) => {
          message += `${index + 1}. ${user}\n`;
        });
      }
  
      const templateParams = {
        to_email: 'recipient@example.com',
        message: message
      };
  
      emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_USER_ID')
        .then((response: EmailJSResponseStatus) => {
          console.log('Email sent successfully', response);
          alert('Email sent successfully');
        }, (error: any) => {
          console.error('Error sending email', error);
        });
    }
  }
  
}
