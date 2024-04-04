import { Component, OnInit } from '@angular/core';
import { GeldiHttpClient } from 'src/app/services/data-layer/geldi-be-mock.service';
import { Table } from 'src/app/entity/table';
import * as XLSX from 'xlsx';
import { Category } from 'src/app/entity/category';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  table: Table[] = [];
  totalContracts: number = 0;
  kategory: Category[] = [];
  expiredContracts: number = 0;
  pageSize: number = 10; // Number of items per page
  currentPage: number = 1; // Current page number

  constructor(private dbService: GeldiHttpClient<Table>) {}

  ngOnInit(): void {
    this.getData();
    this.getTotalContracts();
    this.getExpiredContracts();
    this.getCategoryData()
  }

  getCategoryData() {
    this.dbService.getAll('Kategoryy').subscribe((res) => {
      this.kategory = res;
    });
  }

  getCurrentPageData(): Table[] {
    const startIndex = this.getPageStartIndex();
    const endIndex = this.getPageEndIndex();
    return this.table.slice(startIndex, endIndex);
  }
  
  getData() {
    // First, fetch categories
    this.dbService.getAll('Kategoryy').subscribe((res: Category[]) => {
      this.kategory = res;
  
      // Then, fetch tables
      this.dbService.getAll('Tablee').subscribe((tableRes: Table[]) => {
        // Associate categories with tables
        this.table = tableRes.map(item => {
          return {
            ...item,
            category: this.kategory.find(cat => cat.id === item.categoryId)
          };
        });
      });
    });
  }
  
  
  
  

  deleteUser(id: number) {
    this.dbService.delete('Tablee', id).subscribe((res) => {
      console.log(res);
      alert('Table Deleted');
      // After successful deletion, update the data and counts
      this.getData();
      this.getTotalContracts(); // Update total contracts count
      this.getExpiredContracts(); // Update expired contracts count
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

  // Pagination methods
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    const totalPages = Math.ceil(this.totalContracts / this.pageSize);
    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  }

  getPageStartIndex(): number {
    return (this.currentPage - 1) * this.pageSize;
  }

  getPageEndIndex(): number {
    const endIndex = this.currentPage * this.pageSize;
    return Math.min(endIndex, this.totalContracts);
  }

  // Generate an array of page numbers
  getPageNumbers(): number[] {
    const totalPages = Math.ceil(this.totalContracts / this.pageSize);
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Navigate to a specific page
  goToPage(page: number): void {
    if (page >= 1 && page <= Math.ceil(this.totalContracts / this.pageSize)) {
      this.currentPage = page;
    }
  }
}
