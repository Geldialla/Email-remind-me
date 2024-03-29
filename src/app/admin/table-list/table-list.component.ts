import { Component, OnInit } from '@angular/core';
import { Table } from 'src/app/entity/table';
import { GeldiHttpClient } from 'src/app/services/data-layer/geldi-be-mock.service';


@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  table: Table[] = [];

  constructor(private dbService: GeldiHttpClient<Table>) {}

  ngOnInit(): void {
    this.getData();
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
}
