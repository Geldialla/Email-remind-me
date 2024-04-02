import { Component, OnInit } from '@angular/core';
import { Table } from 'src/app/entity/table';
import { GeldiHttpClient } from 'src/app/services/data-layer/geldi-be-mock.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  table: Table[] = [];
  totalContracts: number = 0;
  expiredContracts: number = 0;

  constructor(private dbService: GeldiHttpClient<Table>) {}

  ngOnInit(): void {
    this.getData();
    this.getTotalContracts();
    this.getExpiredContracts();
  }

  getData() {
    this.dbService.getAll('Tablee').subscribe((res) => {
      this.table = res;
    });
  }

  deleteUser(id: number) {
    this.dbService.delete('Tablee', id).subscribe((res) => {
      console.log(res);
      alert('Table Deleted');
      this.getData();
    });
  }

  getTotalContracts(): void {
    this.dbService.getAll('Tablee').subscribe(tables => {
      this.totalContracts = tables.length;
    });
  }

  getExpiredContracts(): void {
    const now = new Date().getTime();
  
    this.dbService.getAll('Tablee').subscribe(tables => {
      this.expiredContracts = tables.filter(table => {
        const endDate = new Date(table.DataMbarimit).getTime();
        const timeDifference = Math.abs(endDate - now);
        const timeDifferenceInHours = timeDifference / (1000 * 60 * 60); // Convert milliseconds to hours
        return timeDifferenceInHours <= 48;
      }).length;
    });
  }

  exportToExcel(): void {
    const fileName = 'table_data.xlsx';
    const header = ['Punojesi', 'Email', 'Numri Telefonit', 'Numri Personal', 'Pozicjoni Punes', 'Kontrata', 'Data Fillimit', 'Data Mbarimit'];
    const data = this.table.map(table => [table.Punojesi, table.Email, table.NumriTelefonit, table.NumriPersonal, table.PozicjoniPunes, table.Kontrata, table.DataFillimit, table.DataMbarimit]);
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([header, ...data]);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    // Check if there are no contracts
    if (this.totalContracts === 0) {
      alert('There are no contracts to download.');
      return;
    }
  
    // Check if there are no expired contracts
    if (this.expiredContracts === 0) {
      alert('There are no expired contracts to download.');
      return;
    }
  
    // Check if there is one expired contract
    if (this.expiredContracts === 1) {
      XLSX.writeFile(wb, fileName);
      return;
    }
  
    // For other cases, display an alert
    alert('There are multiple expired contracts. Please take necessary actions.');
  }
  
}
