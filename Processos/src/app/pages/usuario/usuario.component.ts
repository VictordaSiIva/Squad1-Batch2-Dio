import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Usuario } from 'src/app/shared/usuario.interfaces';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  private ngGetUsuarioUnsubscribe = new Subject();

   regex: any = /^\s*$/ ;

  usuarioForm: FormGroup;
  id: any
  Id: any

  Usuario: Usuario = {
    id: '',
    nome: '',
    sobreNome: '',
    dtNascimento: '',
    email: '',
    senha: '',
    eTipoUsuario: 0
  };

  constructor(private router: Router,
              private route: ActivatedRoute,
              private usuarioService: UsuarioService,
              private datePipe: DatePipe,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.usuarioForm = new FormGroup({
      nome: new FormControl(null),
      sobreNome: new FormControl(null),
      dtNascimento: new FormControl(null),
      email: new FormControl(null),
      senha: new FormControl(null),
      confirmarSenha: new FormControl(null)
    });
    this.id = this.route.snapshot.params.id;
    this.Id = this.route.snapshot.params.Id;

    if(this.Id)
    {
      this.getUsuario(this.Id);
    }
  }

  getUsuario(id: string) {
    this.usuarioService.getUser(id)
      .subscribe(response => {
         const data = JSON.parse(JSON.stringify(response))
         this.Usuario = JSON.parse(JSON.stringify(response))

         this.usuarioForm.controls.nome.setValue(this.Usuario.nome)
         this.usuarioForm.controls.sobreNome.setValue(this.Usuario.sobreNome)
         this.usuarioForm.controls.dtNascimento.setValue(this.datePipe.transform(this.Usuario.dtNascimento,'dd/MM/yyyy'))
         this.usuarioForm.controls.email.setValue(this.Usuario.email)


      }, err => {

      });
    }


  salvar() {

    const senha = this.usuarioForm.get('senha').value;
    const Csenha = this.usuarioForm.get('confirmarSenha').value;
    if(senha !== Csenha  || (Csenha === null || senha === null))

    {
      this.toastr.error('senhas não se coincidem ou então inválidas');
      return
    }

    if(!this.Id)
    {
    this.Usuario = Object.assign({}, {
      id: '',
      nome: this.usuarioForm.get('nome').value,
      sobreNome: this.usuarioForm.get('sobreNome').value,
      dtNascimento: this.usuarioForm.get('dtNascimento').value,
      email: this.usuarioForm.get('email').value,
      senha: this.usuarioForm.get('senha').value,
      eTipoUsuario: Number.parseInt(this.id)

    });
  }
  else{

      this.Usuario.nome = this.usuarioForm.get('nome').value;
      this.Usuario.sobreNome = this.usuarioForm.get('sobreNome').value;
      this.Usuario.dtNascimento = this.usuarioForm.get('dtNascimento').value;
      this.Usuario.email = this.usuarioForm.get('email').value;
      this.Usuario.senha = this.usuarioForm.get('senha').value;

  }

    let valNome, valsobreNome, valdtNascimento, valEmail;

    valNome = this.regex.test(this.Usuario.nome);
    valsobreNome = this.regex.test(this.Usuario.sobreNome);
    valEmail = this.regex.test(this.Usuario.email);
    valdtNascimento = this.regex.test(this.Usuario.dtNascimento);

    if(valNome === true ||
      this.Usuario.nome === null ||
      valsobreNome === true ||
      this.Usuario.sobreNome == null ||
      valEmail === true ||
      this.Usuario.email === null ||
      valdtNascimento === true ||
      this.Usuario.dtNascimento === null )
    {
      this.toastr.error('Campos inválidos ou vazios.');
      return;
    }

    this.usuarioService.salvar(this.Usuario)
      .pipe(takeUntil(this.ngGetUsuarioUnsubscribe))
      .subscribe(_ => {
        const data = _;

      }, err => {
      });



    this.router.navigateByUrl('/login').then(e => {
      if (e) {
        this.toastr.success('Usuario cadastrado com sucesso!');
      } else {
        console.log("Navigation has failed!");
      }
    });

  }

}
