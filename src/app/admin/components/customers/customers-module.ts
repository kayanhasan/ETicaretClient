import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customers } from './customers';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [Customers],
  imports: [CommonModule,
    RouterModule.forChild([{
    path:"",component:Customers}])],
})
export class CustomersModule {}
