import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dashboards } from './dashboards';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [Dashboards],
  imports: [CommonModule,
    RouterModule.forChild([{
     path:"",component:Dashboards}])],
})
export class DashboardsModule {}
