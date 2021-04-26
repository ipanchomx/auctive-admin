import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
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

  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "top";
  
  constructor(
    private categoryService: CategoryService,
    private _matDialog: MatDialog,
    private _snackBar: MatSnackBar, 
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  
  getCategories():void {
    // this.categories = []
    this.categoryService.getCategories().then((resp:any) => {
      let categoriesList = resp.categories;
      categoriesList.forEach((element:any) => {
        this.categories.push(element.category_name);
      });
    })
  }

  deleteCategory(category_name:String) {
    console.log(category_name);
    this.isLoading = true;
    this.categoryService.deleteCategory(category_name)
      .then((resp:any) => {
        if(resp.success) {
          this.isLoading = false;
          const snack = this._snackBar.open(`Category succesfully deleted - ${category_name}`, "Close", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          })
          snack._dismissAfter(3000);
          this.getCategories();
        } else {
          throw new Error("Could not delete category");
        }
      })
      .catch((err:any) => {
        this.isLoading = false;
        const snack = this._snackBar.open(`The category could not be deleted  - ${err.message}`, "Close", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        })
        snack._dismissAfter(3000);
        this.getCategories();
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
