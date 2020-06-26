import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Processos } from 'src/app/shared/processos.interfaces';
import { ProcessosService } from 'src/app/services/processos/processos.service';

@Component({
  selector: 'app-processos',
  templateUrl: './processos.component.html',
  styleUrls: ['./processos.component.css']
})
export class ProcessosComponent implements OnInit, AfterViewInit, OnDestroy {

  getUsuario: string = window.localStorage.getItem('usuario');

  usuario: any = JSON.parse( this.getUsuario);

  @Input() tipoUsuario: any = this.usuario.tipoUsuario;

  @ViewChild(DataTableDirective, { static: false }) datatableElementProcesso: DataTableDirective;
  isDtInitialized = false;
  dtElementProcesso: DataTableDirective;
  dtOptionsProcesso: DataTables.Settings = {
    pagingType: 'simple_numbers',
    pageLength: 10,
    processing: true,
    dom: 'lrtip',
    language: {
      emptyTable: 'Nenhum registro encontrado',
      info: 'Mostrando de _START_ até _END_ de _TOTAL_ registros',
      infoEmpty: 'Mostrando 0 até 0 de 0 registros',
      infoFiltered: '(Filtrados de _MAX_ registros)',
      infoPostFix: '',
      lengthMenu: '_MENU_ resultados por página',
      loadingRecords: 'Carregando...',
      processing: 'Processando...',
      zeroRecords: 'Nenhum registro encontrado',
      paginate: {
        next: 'Próximo',
        previous: 'Anterior',
        first: 'Primeiro',
        last: 'Último'
      },
      aria: {
        sortAscending: ': Ordenar colunas de forma ascendente',
        sortDescending: ': Ordenar colunas de forma descendente'
      }
    }
  };
  dtInstanceProcesso: DataTables.Api;
  dtTriggerProcesso = new Subject();

  processos: Processos[] = [];


  private ngProcessosUnsubscribe = new Subject();

  constructor(private router: Router,
              private service: ProcessosService,
              private toastr: ToastrService) { }

ngOnInit(): void {
this.todosProcessos();
  }

  rerender(): void {
    this.datatableElementProcesso.dtInstance.then((dtInstance: DataTables.Api) => {

      dtInstance.destroy();
      this.dtTriggerProcesso.next();


    });
  }

  todosProcessos() {

    this.service.getProcessos()
      .pipe(takeUntil(this.ngProcessosUnsubscribe))
      .subscribe(response => {
        const data = response;
        this.processos = JSON.parse(JSON.stringify(data))  ;
        if(this.usuario.tipoUsuario === 2)
        {
          const nome = this.usuario.nome + ' ' + this.usuario.sobreNome;

          this.processos = this.processos.filter(p => p.nomeCliente.toString() === nome)
        }

        this.rerender();

      }, err => {

      });
  }

  confirmDelete(id: string) {
    const isDeleting = confirm('Você realmente deseja apagar este aluno ?');
    if (!isDeleting) {
      return;
    }

    this.deletar(id);
  }

  private deletar(id: string) {
    this.service.deletar(id)
      .subscribe(_ => {
      }, err => {
      });

    window.setTimeout(() => {
        this.toastr.success('Processo excluido com sucesso', 'Aluno');
        this.rerender();
        this.todosProcessos();

      },800);

  }


ngAfterViewInit(): void {
    this.dtTriggerProcesso.next();
  }

  ngOnDestroy(): void {
    this.dtTriggerProcesso.unsubscribe();
    this.ngProcessosUnsubscribe.next();
    this.ngProcessosUnsubscribe.complete();
  }

}
