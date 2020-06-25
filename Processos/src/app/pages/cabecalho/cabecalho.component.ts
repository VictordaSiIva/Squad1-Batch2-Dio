import { Component, OnInit  } from '@angular/core';
import { Usuario } from 'src/app/shared/usuario.interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent implements OnInit  {

  getUsuario: string = window.localStorage.getItem('usuario');

  usuario: Usuario = JSON.parse( this.getUsuario);

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(this.usuario === null)
    {
      this.router.navigateByUrl('/login');
    }
  }

  Logout()
  {
    window.localStorage.getItem('usuario')

    window.localStorage.removeItem('usuario');

    this.router.navigateByUrl('/login');
  }

}
