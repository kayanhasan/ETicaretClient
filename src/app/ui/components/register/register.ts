import { Component, OnInit } from '@angular/core';
import { Base } from '../../../base/base';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from '../../../entities/user';
import { UserService } from '../../../services/common/models/userservice';
import { Create_User } from '../../../contracts/users/create_user';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/ui/cutom-toastr';


@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register extends Base implements OnInit{
   constructor(private formBuilder: UntypedFormBuilder,private userService:UserService,spinner: NgxSpinnerService, private toastrService: CustomToastrService) {
    super(spinner)
  }
  frm: UntypedFormGroup;
  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      nameSurname: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      username: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      email: ["", [
        Validators.required,
        Validators.maxLength(250),
        Validators.email
      ]],
      password: ["",
        [
          Validators.required
        ]],
      passwordConfirm: ["",
        [
          Validators.required
        ]]
    }, {
      validators: (group: AbstractControl): ValidationErrors | null => {
        let sifre = group.get("password").value;
        let sifreTekrar = group.get("passwordConfirm").value;
        return sifre === sifreTekrar ? null : { notSame: true };
      }
    })
  }
  get component() {
    return this.frm.controls;
  }
    submitted: boolean = false;
    async onSubmit(user: User) {
    this.submitted = true;

    if (this.frm.invalid)
      return;

   const result:Create_User= await this.userService.create(user);
    if (result.succeeded)
      this.toastrService.message(result.message, "Kullanıcı Kaydı Başarılı", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      })
    else
      this.toastrService.message(result.message, "Hata", {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopRight
      })
  }
}
