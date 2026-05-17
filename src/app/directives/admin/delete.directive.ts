import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { SpinnerType } from '../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialog, DeleteState } from '../../dialogs/delete-dialog/delete-dialog';
import { HttpClientService } from '../../services/common/http-client-service';
import { Alertify, MessageType, Position } from '../../services/admin/alertify';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService } from '../../services/common/dialog.service';
declare var $:any;
@Directive({
  selector: '[appDelete]',
  standalone: false,
})
export class DeleteDirective {

  constructor(private element:ElementRef,private _renderer:Renderer2,private httpClientService:HttpClientService,private spinner:NgxSpinnerService,public dialog :MatDialog
    ,private alertify:Alertify,private dialogService:DialogService) {
     
     const img=_renderer.createElement("img");
     img.setAttribute("src","/assets/delete.png");
     img.setAttribute("style","cursor:pointer;");
     img.width=20;
     img.height=20;
     _renderer.appendChild(element.nativeElement,img);
  }
  
  @Input()id:string;
  @Input()controller:string;
  @Output()callback:EventEmitter<any>=new EventEmitter();
  @HostListener("click")
async onclick() {
    this.dialogService.openDialog({
      componentType: DeleteDialog,
      data: DeleteState.Yes,
      afterClosed: async () => {
        this.spinner.show(SpinnerType.SquarejellyBox);
        const td: HTMLTableCellElement = this.element.nativeElement;
        this.httpClientService.delete({
          controller: this.controller
        }, this.id).subscribe(data => {
          $(td.parentElement).animate({
            opacity: 0,
            left: "+=50",
            height: "toogle"
          }, 700, () => {
            this.callback.emit();
            this.alertify.message(`${this.controller == 'roles' ? 'Rol' : 'Ürün'} başarıyla silinmiştir.`, {
              dismissOthers: true,
              messageType: MessageType.Success,
              position: Position.TopRight
            })
          });
        }, (errorResponse: HttpErrorResponse) => {
          this.spinner.hide(SpinnerType.SquarejellyBox);
          this.alertify.message("Beklenmeyen bir hatayla karşılaşılmıştır.", {
            dismissOthers: true,
            messageType: MessageType.Error,
            position: Position.TopRight
          });
        });
      }
    });
  }

 /*openDialog(afterClosed:any): void {
    const dialogRef = this.dialog.open(DeleteDialog, {
     width:'250px',
     data:DeleteState.Yes
    });

    dialogRef.afterClosed().subscribe(result => {
        if(result==DeleteState.Yes) {
         afterClosed();
        }
   
    });
  }*/
}
