// category-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/entity/category';
import { GeldiHttpClient } from 'src/app/services/data-layer/geldi-be-mock.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  kategory: Category[] = [];
 
  constructor(private dbService: GeldiHttpClient<Category>) {}

  ngOnInit(): void {
    this.getCategoryData();
  }

  getCategoryData() {
    this.dbService.getAll('Kategoryy').subscribe((res) => {
      this.kategory = res;
    });
  }

  deleteUser(id: number) {
    this.dbService.delete('Kategoryy', id).subscribe((res) => {
      console.log(res);
      alert('Kategoryy Deleted');
      this.getCategoryData();
    });
  }
}
