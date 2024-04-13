import { Component, OnInit, inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { HttpService } from '../../http.service';
import { IUser } from '../../Interfaces/user';
import { Router } from '@angular/router';
import { IUserUpdate } from '../../Interfaces/userUpdate';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, FormsModule, MatButton, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit{
  router=inject(Router);
  httpService=inject(HttpService);
  formbuilder=inject(FormBuilder)
  toastrService=inject(ToastrService);
  userId: string = '';
  isEdit: boolean = false;

  ngOnInit(): void {
    this.userId = this.router.url.split('/')[2];

    if(this.userId != undefined){
      this.isEdit = true;
      console.log(this.isEdit)

      this.httpService.getUserById(this.userId).subscribe(
        (response) => {
          this.userForm.setValue({
            nome: response.nome!,
            cpf: response.cpf!,
            sexo: response.sexo!,
            telefone: response.telefone!,
            email: response.email!,
            dataNascimento: response.dataNascimento!,
            observacao: response.observacao!
          });
          this.userForm.controls['nome'].disable();
          this.userForm.controls['cpf'].disable();
          this.userForm.controls['sexo'].disable();
          this.userForm.controls['dataNascimento'].disable();

        },
        (error) => {
          console.log(error);}
      );
    }else{
      this.isEdit = false;
    }
  }


  userForm = this.formbuilder.group({
    nome: ['',[Validators.required, Validators.minLength(3)]],
    cpf: ['',[Validators.required, Validators.minLength(11)]],
    sexo: ['',[Validators.required]],
    telefone: ['',[Validators.required, Validators.minLength(9)]],
    email: ['',[Validators.required, Validators.email]],
    dataNascimento: ['',[Validators.required]],
    observacao: ['']
  });

  saveUser(){
    const newUser : IUser = {
      nome: this.userForm.value.nome!,
      cpf: this.userForm.value.cpf!,
      sexo: this.userForm.value.sexo!,
      telefone: this.userForm.value.telefone!,
      email: this.userForm.value.email!,
      dataNascimento: this.userForm.value.dataNascimento!,
      observacao: this.userForm.value.observacao!
    };

    const updateUser : IUserUpdate = {
      Id: this.userId,
      telefone: this.userForm.value.telefone!,
      email: this.userForm.value.email!,
      observacao: this.userForm.value.observacao!
    };

    if(this.isEdit){
      this.httpService.updateUser(updateUser.Id!,updateUser).subscribe(
        (response) => {
          console.log(response);
          this.toastrService.success('Usuário alterado com sucesso!');
          this.router.navigate(['']);
        },
        (error) => {
          console.log(error);
          this.toastrService.success('Erro ao editar usuário!' );
        }
      );
    }else{
      this.isEdit = false;
      this.httpService.createUser(newUser).subscribe(
        (response) => {
          this.toastrService.success('Usuário criado com sucesso!');
          this.router.navigate(['']);
        },
        (error) => {
          console.log(error);
          this.toastrService.success('Erro ao criar usuário!' );
        }
      );
    }
  }


}


