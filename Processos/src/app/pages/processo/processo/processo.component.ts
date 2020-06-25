import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Guid } from 'guid-typescript';


import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Processos } from 'src/app/shared/processos.interfaces';
import { ProcessosService } from 'src/app/services/processos/processos.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Usuario } from 'src/app/shared/usuario.interfaces';

@Component({
  selector: 'app-processo',
  templateUrl: './processo.component.html',
  styleUrls: ['./processo.component.css']
})
export class ProcessoComponent implements OnInit {

  private ngGetProcessoUnsubscribe = new Subject();
  private ngGetUsuariosUnsubscribe = new Subject();

  clientes: Usuario[] = [];
  ProcessoForm: FormGroup;

  regex: any = /^$|\s+/ ;

  processo: Processos = {
    Id: '',
    NomeCliente: '',
    NumProcesso: '',
    DataDecisao: '',
    Descricao: '',
    ProximoPasso: '',
    LinkProcesso: '',

  };

  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: ProcessosService,
              private Service: UsuarioService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getClientes();
    this.ProcessoForm = new FormGroup({
      nomeCliente: new FormControl(null),
      dataDecisao: new FormControl(null),
      descricao: new FormControl(null),
      proximoPasso: new FormControl(null),
      linkProcesso: new FormControl(null)
    });

    const id = this.route.snapshot.params.id;

    if (id)
    {

    }

  }


 getClientes() {
   this.Service.getUsers()
      .pipe(takeUntil(this.ngGetUsuariosUnsubscribe))
      .subscribe(response => {
        const data: any[] = JSON.parse(JSON.stringify(response))  ; ;
        this.clientes = data.filter(a => a.tipoUsuario === 2);

      }, err => {

      });
  }

  salvar() {

    if (!this.processo.Id) {
      this.processo = Object.assign({}, {
        Id: '',
        NomeCliente: this.ProcessoForm.get('nomeCliente').value,
        NumProcesso: Guid.create().toString().substr(0, 6).toUpperCase(),
        DataDecisao: this.ProcessoForm.get('dataDecisao').value,
        Descricao: this.ProcessoForm.get('descricao').value,
        ProximoPasso: this.ProcessoForm.get('proximoPasso').value,
        LinkProcesso: this.ProcessoForm.get('linkProcesso').value,
      });
    } else {
      this.processo.NomeCliente = this.ProcessoForm.get('nomeCliente').value;
      this.processo.DataDecisao = this.ProcessoForm.get('dataDecisao').value;
      this.processo.Descricao = this.ProcessoForm.get('descricao').value;
      this.processo.ProximoPasso = this.ProcessoForm.get('proximoPasso').value;
      this.processo.NomeCliente = this.ProcessoForm.get('linkProcesso').value;


    }


    this.service.salvar(this.processo)
      .pipe(takeUntil(this.ngGetProcessoUnsubscribe))
      .subscribe(_ => {


      }, err => {
      });

    this.router.navigateByUrl('/processos').then(e => {
        if (e ) {
          if (this.processo.Id === '')
          {
            this.toastr.success('Aluno cadastrado com sucesso!', 'Aluno');

          }
          else
          {
            this.toastr.success('Aluno atualizado com sucesso!', 'Aluno');
          }
          console.log('Navigation is successful!');
        } else {
          console.log('Navigation has failed!');
        }
      });
  }


}
