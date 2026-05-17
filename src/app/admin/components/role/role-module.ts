import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Role } from './role';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DeleteDirectiveModule } from '../../../directives/admin/delete-directive-module';
import { List } from './list/list';
import { Create } from './create/create';

@NgModule({
  declarations: [Role, List, Create],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: Role }]),
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    DeleteDirectiveModule,
  ],
})
export class RoleModule {}
