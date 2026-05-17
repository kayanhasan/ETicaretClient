import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core'; // ChangeDetectorRef eklendi
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoleService } from '../../services/common/models/role.service';
import { AuthorizationEndpointService } from '../../services/common/models/authorization-endpoint.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { List_Role } from '../../contracts/role/List_Role';
import { MatSelectionList } from '@angular/material/list';
import { SpinnerType } from '../../base/base';

@Component({
  selector: 'app-authorize-menu-dialog',
  standalone: false,
  templateUrl: './authorize-menu-dialog.html',
  styleUrl: './authorize-menu-dialog.scss',
})
export class AuthorizeMenuDialog extends BaseDialog<AuthorizeMenuDialog> implements OnInit {
  constructor(
    dialogRef: MatDialogRef<AuthorizeMenuDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService: RoleService,
    private authorizationEndpointService: AuthorizationEndpointService,
    private spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef // Constructor'a dahil edildi
  ) {
    super(dialogRef);
  }

  roles: { datas: List_Role[], totalCount: number };
  assignedRoles: Array<string> = []; // Hata önleme amaçlı [] ile başlatıldı
  listRoles: { name: string, selected: boolean }[];

  async ngOnInit() {
    this.spinner.show(SpinnerType.SquarejellyBox);
    
    try {
      // Endpoint'e atanmış mevcut rolleri çekiyoruz
      this.assignedRoles = await this.authorizationEndpointService.getRolesToEndpoint(this.data.code, this.data.menuName);

      // Sistemdeki tüm rolleri çekiyoruz
      this.roles = await this.roleService.getRoles(-1, -1);

      if (this.roles && this.roles.datas) {
        this.listRoles = this.roles.datas.map((r: any) => {
          return {
            name: r.name,
            selected: this.assignedRoles ? this.assignedRoles.indexOf(r.name) > -1 : false
          };
        });
      }
    } catch (error) {
      console.error("Menü yetkileri yüklenirken hata oluştu:", error);
    } finally {
      this.spinner.hide(SpinnerType.SquarejellyBox);
      // Asenkron işlemler bitti, Angular'a görünümü güncellemesini bildiriyoruz
      this.cdr.detectChanges();
    }
  }

  assignRoles(rolesComponent: MatSelectionList) {
    // HTML'deki [value] eşlemesi sayesinde doğrudan o.value okuyoruz
    const roles: string[] = rolesComponent.selectedOptions.selected.map(o => o.value);
    
    this.spinner.show(SpinnerType.SquarejellyBox);
    
    this.authorizationEndpointService.assignRoleEndpoint(roles, this.data.code, this.data.menuName,
      () => {
        this.spinner.hide(SpinnerType.SquarejellyBox);
        this.dialogRef.close(); // İşlem başarılıysa dialogu kapatıyoruz
      }, 
      error => {
        this.spinner.hide(SpinnerType.SquarejellyBox);
        console.error("Rol atama hatası:", error);
      }
    );
  }
}

export enum AuthorizeMenuState {
  Yes,
  No
}