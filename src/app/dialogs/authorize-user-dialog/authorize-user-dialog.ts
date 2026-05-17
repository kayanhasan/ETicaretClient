import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core'; // ChangeDetectorRef eklendi
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoleService } from '../../services/common/models/role.service';
import { UserService } from '../../services/common/models/userservice';
import { NgxSpinnerService } from 'ngx-spinner';
import { List_Role } from '../../contracts/role/List_Role';
import { SpinnerType } from '../../base/base';
import { MatSelectionList } from '@angular/material/list';

@Component({
  selector: 'app-authorize-user-dialog',
  standalone: false,
  templateUrl: './authorize-user-dialog.html',
  styleUrl: './authorize-user-dialog.scss',
})
export class AuthorizeUserDialog extends BaseDialog<AuthorizeUserDialog> implements OnInit {
  constructor(
    dialogRef: MatDialogRef<AuthorizeUserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService: RoleService,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef // Constructor'a inject edildi
  ) {
    super(dialogRef);
  }

  roles: { datas: List_Role[], totalCount: number };
  assignedRoles: Array<string> = []; // Hata almamak için boş dizi ile başlattık
  listRoles: { name: string, selected: boolean }[];

  async ngOnInit() {
    this.spinner.show(SpinnerType.SquarejellyBox);
    
    try {
      // 1. Kullanıcının mevcut rollerini çekiyoruz
      this.assignedRoles = await this.userService.getRolesToUser(this.data, () => {});

      // 2. Sistemdeki tüm rolleri çekiyoruz (-1, -1 tüm listeyi getirmek için)
      this.roles = await this.roleService.getRoles(-1, -1);

      // 3. Roller yüklendiyse eşleştirme yapıp listRoles dizisini dolduruyoruz
      if (this.roles && this.roles.datas) {
        this.listRoles = this.roles.datas.map((r: any) => {
          return {
            name: r.name,
            selected: this.assignedRoles ? this.assignedRoles.indexOf(r.name) > -1 : false
          };
        });
      }
    } catch (error) {
      console.error("Roller yüklenirken hata oluştu:", error);
    } finally {
      this.spinner.hide(SpinnerType.SquarejellyBox);
      // 4. Asenkron işlem bitti, Angular'a UI'ı render etmesini söylüyoruz
      this.cdr.detectChanges();
    }
  }

  assignRoles(rolesComponent: MatSelectionList) {
    // HTML'e eklediğimiz [value]="role.name" sayesinde doğrudan o.value diyebiliyoruz
    const roles: string[] = rolesComponent.selectedOptions.selected.map(o => o.value);
    
    this.spinner.show(SpinnerType.SquarejellyBox);
    
    this.userService.assignRoleToUser(this.data, roles,
      () => {
        this.spinner.hide(SpinnerType.SquarejellyBox);
        this.dialogRef.close(); // Rol atama başarılıysa dialogu kapatabilirsiniz
      }, 
      error => {
        this.spinner.hide(SpinnerType.SquarejellyBox);
        console.error("Rol atanırken hata oluştu:", error);
      }
    );
  }
}