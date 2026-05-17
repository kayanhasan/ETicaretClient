import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client-service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/cutom-toastr';
import { Alertify, MessageType, Position } from '../../admin/alertify';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { Dialog } from '@angular/cdk/dialog';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { FileUploadDialog, FileUploadDialogState } from '../../../dialogs/file-upload-dialog/file-upload-dialog';
import { SpinnerType } from '../../../base/base';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-file-upload',
  standalone: false,
  templateUrl: './file-upload.html',
  styleUrl: './file-upload.scss',
})
export class FileUpload {
  constructor(
    private httpClientService: HttpClientService,
    private alertifyService: Alertify,
    private customToastrService: CustomToastrService,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private spinner: NgxSpinnerService) { }

  public files: NgxFileDropEntry[];

  @Input() options: Partial<FileUploadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });
    }
    this.dialogService.openDialog({
      componentType: FileUploadDialog,
      data: FileUploadDialogState.Yes,
      afterClosed: () => {
        this.spinner.show(SpinnerType.SquarejellyBox)
        this.httpClientService.post({
          controller: this.options.controller,
          action: this.options.action,
          queryString: this.options.queryString,
          headers: new HttpHeaders({ "responseType": "blob" })
        }, fileData).subscribe(data => {

          const message: string = "Dosyalar başarıyla yüklenmiştir.";

          this.spinner.hide(SpinnerType.SquarejellyBox);
          if (this.options.isAdminPage) {
            this.alertifyService.message(message,
              {
                dismissOthers: true,
                messageType: MessageType.Success,
                position: Position.TopRight
              })
          } else {
            this.customToastrService.message(message, "Başarılı.", {
              messageType: ToastrMessageType.Success,
              position: ToastrPosition.TopRight
            })
          }


        }, (errorResponse: HttpErrorResponse) => {

          const message: string = "Dosyalar yüklenirken beklenmeyen bir hatayla karşılaşılmıştır.";

          this.spinner.hide(SpinnerType.SquarejellyBox)
          if (this.options.isAdminPage) {
            this.alertifyService.message(message,
              {
                dismissOthers: true,
                messageType: MessageType.Error,
                position: Position.TopRight
              })
          } else {
            this.customToastrService.message(message, "Başarsız.", {
              messageType: ToastrMessageType.Error,
              position: ToastrPosition.TopRight
            })
          }

        });
      }
    });
  }

  //openDialog(afterClosed: any): void {
  //  const dialogRef = this.dialog.open(FileUploadDialogComponent, {
  //    width: '250px',
  //    data: FileUploadDialogState.Yes,
  //  });

  //  dialogRef.afterClosed().subscribe(result => {
  //    if (result == FileUploadDialogState.Yes)
  //      afterClosed();
  //  });
  //}
}
export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;
}