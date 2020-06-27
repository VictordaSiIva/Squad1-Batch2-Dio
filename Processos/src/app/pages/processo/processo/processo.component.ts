import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Guid } from 'guid-typescript';
import { DatePipe } from '@angular/common';


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
    id: '',
    nomeCliente: '',
    numProcesso: '',
    dataDecisao: '',
    descricao: '',
    proximoPasso: '',
    linkProcesso: '',

  };

  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: ProcessosService,
              private Service: UsuarioService,
              private toastr: ToastrService,
              private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getClientes();
    this.ProcessoForm = new FormGroup({
      nomeCliente: new FormControl(null),
      dataDecisao: new FormControl(null),
      descricao: new FormControl(null),
      proximoPasso: new FormControl(null),
      linkProcesso: new FormControl(null)
    });

    const id = this.route.snapshot.params["id"];

    if (id)
    {
      this.getProcesso(id);
    }

  }

  getProcesso(id: string) {
    this.service.getProcesso(id)
      .subscribe(response => {
         const data = response;
         this.processo = JSON.parse(JSON.stringify(response))

         this.ProcessoForm.controls['nomeCliente'].setValue(this.processo.nomeCliente)
         this.ProcessoForm.controls['dataDecisao'].setValue(this.datePipe.transform(this.processo.dataDecisao,'yyyy-MM-dd'))
         this.ProcessoForm.controls['descricao'].setValue(this.processo.descricao)
         this.ProcessoForm.controls['proximoPasso'].setValue(this.processo.proximoPasso)
         this.ProcessoForm.controls['linkProcesso'].setValue(this.processo.linkProcesso)

      }, err => {

      });


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

    if (!this.processo.id) {
      this.processo = Object.assign({}, {
        id: '',
        nomeCliente: this.ProcessoForm.get('nomeCliente').value,
        numProcesso: Guid.create().toString().substr(0, 6).toUpperCase(),
        dataDecisao: this.ProcessoForm.get('dataDecisao').value,
        descricao: this.ProcessoForm.get('descricao').value,
        proximoPasso: this.ProcessoForm.get('proximoPasso').value,
        linkProcesso: this.ProcessoForm.get('linkProcesso').value,
      });
    } else {
      this.processo.nomeCliente = this.ProcessoForm.get('nomeCliente').value;
      this.processo.dataDecisao = this.ProcessoForm.get('dataDecisao').value;
      this.processo.descricao = this.ProcessoForm.get('descricao').value;
      this.processo.proximoPasso = this.ProcessoForm.get('proximoPasso').value;
      this.processo.linkProcesso = this.ProcessoForm.get('linkProcesso').value;


    }

    let valNomecliente, valdataDecisao, valdescricao, valproximoPasso, valLinkProcesso;

    valNomecliente = this.regex.test(this.processo.nomeCliente);
    valdescricao = this.regex.test(this.processo.descricao);
    valproximoPasso = this.regex.test(this.processo.proximoPasso);
    valLinkProcesso = this.regex.test(this.processo.linkProcesso);
    valdataDecisao = this.regex.test(this.processo.dataDecisao);

    if(valNomecliente === true ||
      this.processo.nomeCliente === null ||
      valdescricao === true ||
      this.processo.descricao == null ||
      valproximoPasso === true ||
      this.processo.proximoPasso === null ||
      valLinkProcesso === true ||
      this.processo.linkProcesso === null ||
      valdataDecisao === true ||
      this.processo.dataDecisao == null)
    {
      this.toastr.error('Campos inválidos ou vazios.');
      return;
    }

    this.service.salvar(this.processo)
      .pipe(takeUntil(this.ngGetProcessoUnsubscribe))
      .subscribe(_ => {


      }, err => {
      });

    this.router.navigateByUrl('/processos').then(e => {
        if (e ) {
          if (this.processo.id === '')
          {
            this.toastr.success('Processo cadastrado com sucesso!');

          }
          else
          {
            this.toastr.success('Processo atualizado com sucesso!');
          }
          console.log('Navigation is successful!');
        } else {
          console.log('Navigation has failed!');
        }
      });
  }


}
