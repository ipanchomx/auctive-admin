import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateCategoryComponent } from 'src/app/dialogs/create-category/create-category.component';
import { CategoryService } from 'src/app/global/services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoading: boolean = false;
  errorMessage: String = '';
  currentUser: String;
  categories: string[] = [];

  constructor(
    private categoryService: CategoryService,
    private _matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  
  getCategories():void {
    this.categories = []
    this.categoryService.getCategories().then((resp:any) => {
      let categoriesList = resp.categories;
      categoriesList.forEach((element:any) => {
        this.categories.push(element.category_name);
      });
    })
  }


  launchCreateCategoryDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = "200";
    dialogConfig.width = "40%"
    dialogConfig.minWidth = "360px";
    dialogConfig.minHeight = "200px"
    dialogConfig.data = {};

    const dialogRef = this._matDialog.open(CreateCategoryComponent, dialogConfig);

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) this.getCategories();
      });
  }
}
