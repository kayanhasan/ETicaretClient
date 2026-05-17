import { Component, OnInit, ViewChild } from '@angular/core';
import { List } from './list/list';

@Component({
  selector: 'app-role',
  standalone: false,
  templateUrl: './role.html',
  styleUrl: './role.scss',
})
export class Role  implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild(List) listComponents: List;

  createdRole(createdRole: string) {
    this.listComponents.getRoles();
  }
}
