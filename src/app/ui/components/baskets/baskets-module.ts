import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Baskets } from './baskets';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [Baskets],
  imports: [CommonModule,
    RouterModule.forChild([{
     path:"",component:Baskets}])],
      exports: [
    Baskets
  ]
})
export class BasketsModule {}
