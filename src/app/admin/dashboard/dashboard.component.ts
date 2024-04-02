import { Component, OnInit } from '@angular/core';
import { GeldiHttpClient } from 'src/app/services/data-layer/geldi-be-mock.service';
import { Table } from 'src/app/entity/table';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalContracts: number = 0;
  expiredContracts: number = 0;
  tableData: Table[] = [];

  constructor(private geldiHttpClient: GeldiHttpClient<Table>) { }

  ngOnInit(): void {
    this.getTotalContracts();
    this.getExpiredContracts();
    this.getAllTableData();
  }

  getTotalContracts(): void {
    this.geldiHttpClient.getAll('Tablee').subscribe(tables => {
      this.totalContracts = tables.length;
    });
  }

  getExpiredContracts(): void {
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

  getAllTableData(): void {
    this.geldiHttpClient.getAll('Tablee').subscribe(data => {
      this.tableData = data;
    });
  }

  exportToExcel(): void {
    const fileName = 'dashboard_data.xlsx';
    const header = ['Punojesi', 'Email', 'Numri Telefonit', 'Numri Personal', 'Pozicjoni Punes', 'Kontrata', 'Data Fillimit', 'Data Mbarimit'];
    const data = this.tableData.map(table => [table.Punojesi, table.Email, table.NumriTelefonit, table.NumriPersonal, table.PozicjoniPunes, table.Kontrata, table.DataFillimit, table.DataMbarimit]);
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([header, ...data]);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, fileName);
  }
}

