import { Component, OnInit } from '@angular/core';
import { GeldiHttpClient } from 'src/app/services/data-layer/geldi-be-mock.service';
import { Table } from 'src/app/entity/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalContracts: number = 0;
  expiredContracts: number = 0;

  constructor(private geldiHttpClient: GeldiHttpClient<Table>) { }

  ngOnInit(): void {
    this.getTotalContracts();
    this.getExpiredContracts();
  }

  getTotalContracts(): void {
    this.geldiHttpClient.getAll('Tablee').subscribe(tables => {
      this.totalContracts = tables.length;
    });
  }

  getExpiredContracts(): void {
    const fortyEightHours = 48 * 60 * 60 * 1000; // 48 hours in milliseconds
    const now = new Date().getTime();
  
    this.geldiHttpClient.getAll('Tablee').subscribe(tables => {
      this.expiredContracts = tables.filter(table => {
        const endDate = new Date(table.DataMbarimit).getTime();
        const timeDifference = Math.abs(endDate - now);
        const timeDifferenceInHours = timeDifference / (1000 * 60 * 60); // Convert milliseconds to hours
        return timeDifferenceInHours <= 48;
      }).length;
    });
  }
  
  
  
}
