import { Component, OnInit, inject } from '@angular/core';
import { IUser } from '../../Interfaces/user';
import { HttpService } from '../../http.service';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{
  userList : IUser[] = [];
  httpService=inject(HttpService);
  router=inject(Router);
  toastrService=inject(ToastrService);
  displayedColumns: string[] = ['Nome', 'Cpf', 'Sexo', 'Telefone', 'Email' ,'DataNascimento', 'Observacao','Editar' , 'Excluir'];

  ngOnInit(){
    this.httpService.getallUsers().subscribe(data =>{
      this.userList = data;
    });
  }

  editUser(id: string){
    this.router.navigate(['User/'+id]);
  }

  deleteUser(id: string){
    this.httpService.deleteUser(id).subscribe(
      (response) => {
        console.log(response);
        this.ngOnInit();
        this.toastrService.success('Usuário excluído com sucesso!');
      },
      (error) => {
        this.toastrService.error(error.error);
        console.log(error);
      }
    );
  }
}
