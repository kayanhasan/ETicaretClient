import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Orders } from './orders';
import { RouterModule } from '@angular/router';
import { List } from './list/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DialogModule } from '../../../dialogs/dialog-module';
import { DeleteDirectiveModule } from '../../../directives/admin/delete-directive-module';
@NgModule({
  declarations: [Orders, List],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: Orders,
      },
    ]), MatSidenavModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatPaginatorModule,
    DialogModule,
    DeleteDirectiveModule
  ],
})
export class OrdersModule {}
