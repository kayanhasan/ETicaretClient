import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdatePassword } from './update-password';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [UpdatePassword],
  imports: [CommonModule, RouterModule.forChild([
      { path: "", component: UpdatePassword }
    ])],
})
export class UpdatePasswordModule {}
