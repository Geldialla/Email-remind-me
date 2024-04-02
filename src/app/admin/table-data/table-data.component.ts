import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'src/app/entity/table';
import { GeldiHttpClient } from 'src/app/services/data-layer/geldi-be-mock.service';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.css']
})
export class TableDataComponent implements OnInit {

  tableId: number = 0;
  isEditMode: boolean = false;

  table: Partial<Table> = {
    Punojesi: '',
    Email: '',
    NumriTelefonit: 0,
    NumriPersonal: '',
    PozicjoniPunes: '',
    Kontrata: '',
    DataFillimit: 0,
    DataMbarimit: 0,
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dbService: GeldiHttpClient<Table>,
  ) {
    this.tableId = +this.route.snapshot.params['id'];
    this.isEditMode = this.tableId !== 0 && !isNaN(this.tableId);
  }

  ngOnInit(): void {
    if (this.isEditMode) {
      this.getUserData(this.tableId);
    }
  }
  
  getUserData(id: number) {
    this.dbService.getById('Tablee', id).subscribe((product: Partial<Table>) => {
      this.table = product;
    });
  }
  
  save() {
    if (this.isEditMode) {
      this.dbService.put('Tablee', this.tableId, this.table as Table).subscribe((res) => {
        console.log(res);
        alert('Table updated');
        this.router.navigate(['/Admin/Table-List']);
      });
    } else {
      this.dbService.post('Tablee', this.table as Table).subscribe((res) => {
        console.log(res);
        alert('Table created');
        this.router.navigate(['/Admin/Table-List']);
      });
    }
  }
  
}
