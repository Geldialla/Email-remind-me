import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/entity/category';
import { GeldiHttpClient } from 'src/app/services/data-layer/geldi-be-mock.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {
  categoryId: number = 0;
  isEditMode: boolean = false;
  
  category: Partial<Category> = {
    Name: '',
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dbService: GeldiHttpClient<Category>
  ) {
    this.categoryId = +this.route.snapshot.params['id'];
    this.isEditMode = this.categoryId !== 0 && !isNaN(this.categoryId);
  }

  ngOnInit(): void {
    if (this.isEditMode) {
      this.getCategoryData(this.categoryId);
    }
  }

  getCategoryData(id: number) {
    this.dbService.getById('Kategoryy', id).subscribe((category: Category) => {
      this.category = category;
    });
  }

  save() {
    if (this.isEditMode) {
      this.dbService.put('Kategoryy', this.categoryId, this.category as Category).subscribe((res) => {
        console.log(res);
        alert('Kategoryy updated');
        this.router.navigate(['/Admin/Category-List']);
      });
    } else {
      this.dbService.post('Kategoryy', this.category as Category).subscribe((res) => {
        console.log(res);
        alert('Kategoryy created');
      });

      this.router.navigate(['/Admin/Category-List']);
    }
  }
  
}
