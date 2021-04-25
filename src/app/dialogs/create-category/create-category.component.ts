import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { UserService } from 'src/app/global/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/global/services/category.service';


@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  category: string = '';
  inProgress: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogRef: MatDialogRef<CreateCategoryComponent>,
    private _categoryService: CategoryService,
    private _snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void {
  }

  onClose() {
    this._dialogRef.close();
  }

  createCategory() {
    this.inProgress = true;

    this._categoryService.createCategory(this.category)
      .then((resp:any) => {
        this.inProgress = false;
        this._dialogRef.close({});
        const snackbarRef = this._snackBar.open(`Category created succesfully!`, "Close", {
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        
      snackbarRef._dismissAfter(3000);
      })
      .catch((err:any) => {
        this.inProgress = false;
        const snackbarRef = this._snackBar.open(`Unable to create category - ${err.message}`, "Close", {
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });

        snackbarRef._dismissAfter(3000);
      })

  }

}
