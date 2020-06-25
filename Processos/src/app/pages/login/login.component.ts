import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/app/shared/usuario.interfaces';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: Login = {
    email: '',
    senha: ''
  };

  loginForm: FormGroup;

  constructor(private router: Router,
    private usuarioService: UsuarioService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    const user = window.localStorage.getItem('usuario')
    this.loginForm = new FormGroup({
      email: new FormControl(null),
      senha: new FormControl(null),

    });

    if( user !== null)
    {
      this.router.navigateByUrl('/menu')
    }

  }

  fazerLogin() {

    this.login = Object.assign({}, {

      email: this.loginForm.get('email').value,
      senha: this.loginForm.get('senha').value,
    });

    this.usuarioService.fazerLogin(this.login)
      .subscribe(response => {
         const data = response;

         if(data !== null)
         {
         window.localStorage.setItem('usuario', JSON.stringify(data) );
        this.router.navigateByUrl('/menu');
         }
         else{
          this.toastr.error('E-mail ou senha incorreto!');
          this.router.navigateByUrl('/login');
         }

      }, err => {

      });


  }

}
