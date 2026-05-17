import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from './user';
import { List } from './list/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DeleteDirectiveModule } from '../../../directives/admin/delete-directive-module';
import { RouterModule } from '@angular/router';
import { DialogModule } from '../../../dialogs/dialog-module';
@NgModule({
  declarations: [User, List],
  imports: [CommonModule,MatSidenavModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatPaginatorModule,
    DialogModule,
    DeleteDirectiveModule,
    RouterModule.forChild([
      { path: "", component: User }
    ]),
  ]
})
export class UserModule {}
